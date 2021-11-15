/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from 'functions/supabaseAdmin'
import { verifyPaddleWebhook } from 'verify-paddle-webhook'

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAsfDwKMTwJO25FVpuFdV5
T6F5n+B8HNgQIVYc+wL5RE3Q94U+BVe2Avmszk9QhxwuDGYSMQ1C5A98wQgvHCic
9/TBykPAnoGthnf7RzgzIROzfa/JVBbv2peQg+vpqI2L5cmL9Ee+tT5c9mOWMD53
ugtzSndvDcD6N4T33M4jf7xa7TX37FWD7ALFuq8vBjjat6BcW9BDMRPCDbPT5TvA
ULiczhzsI3tUA6cst2YxMbLMCPfPsf/DNojM2cz61LWPnzJnh4FW7o9/kYLSUdKM
eLc/X1BmDunqp7TvtGzDA6/H4k5Y2bHuL8yCOSM2F7hpA2oLsx3FyJx6C7rS1A7+
ZpguGWyxyllXg6a3MgL7tG8FeD4UemOAw+jn5IO6F614OFR1MZBGFtbJFjRR8shY
4qEuLAT6+8kQoYFTFzz6TkurjkgrZ1EjiODx8Zu5hj422VLHFRhipmm3GMcdArLh
+/fBP2xm9XcNuQBCtrbt6te8x292RLviTQMKHSx3rOrRATpp2E4PzoC3DBvEj2Hx
94t8I3EXpDVvQ3Nlvic6b6PMNa4pkFBa80vaAv4nG2FSXVttHMKtpp5SjsvvT9IK
6W1ClBCNKiOaZIHiBgje/Ay0ZeY2WJzFuouNjOZnStG3vSpT529xTg7FcHQe84ps
J4621sD8Llgz3vdKc45xp10CAwEAAQ==
-----END PUBLIC KEY-----`

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Check if the webhook signature is correct
	if (!verifyPaddleWebhook(PUBLIC_KEY, req.body)) {
		return res.status(400).json({
			error: 'Invalid signature',
		})
	}

	const { alert_name, email } = req.body

	let { data: returned } = await supabaseAdmin
		.from('userdata')
		.select()
		.eq('email', email)

	if (!returned || !returned[0])
		return res.status(400).json({ error: 'No data returned' })

	let user = returned![0]

	if (alert_name) {
		// delay subscription_created to wait for subscription_payment_succeeded to finish
		if (alert_name === 'subscription_created') {
			let waited = 0
			while (!user.receipt_url && waited < 8000) {
				await sleep(2000)
				waited += 2000

				let { data: returnedAgain } = await supabaseAdmin
					.from('userdata')
					.select()
					.eq('email', email)

				if (!returnedAgain)
					return res.status(406).json({ error: 'No data returned' })

				user = returnedAgain![0]
			}
		}

		const {
			country,
			currency,
			update_url,
			cancel_url,
			receipt_url,
			event_time,
			payment_method,
			next_payment_amount,
			next_bill_date,
			customer_name,
			status,
			cancellation_effective_date,
			paused_from,
		} = req.body

		if (alert_name) user.alert_name = alert_name
		if (event_time) user.event_time = event_time
		if (status) user.status = status
		if (customer_name) user.name = customer_name
		if (country) user.country = country
		if (currency) user.currency = currency
		if (update_url) user.update_url = update_url
		if (cancel_url) user.cancel_url = cancel_url
		if (receipt_url) user.receipt_url = receipt_url
		if (payment_method) user.payment_method = payment_method
		if (next_payment_amount) user.next_payment_amount = next_payment_amount
		if (next_bill_date) user.next_bill_date = next_bill_date
		if (cancellation_effective_date)
			user.cancelled_date = cancellation_effective_date
		if (paused_from) user.paused_date = paused_from

		const { data, error } = await supabaseAdmin
			.from('userdata')
			.update(user)
			.eq('id', user.id)

		if (error) {
			return res.status(400).json({ error })
		} else if (data) {
			return res
				.status(200)
				.json({ success: 'Webhook received and processed successfully' })
		}
	}

	return res.status(400).json({ error: 'No alert_name found' })
}
