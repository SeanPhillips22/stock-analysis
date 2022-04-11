import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from 'functions/supabaseAdmin'
import { sleep } from 'functions/helpers/sleep'
import { verifyWebhook } from 'functions/auth/verifyWebhook'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Validate webhook signature to verify that it was sent from Paddle.
	if (!verifyWebhook(req)) {
		return res.status(400).json({
			error: 'Invalid signature'
		})
	}

	// Check if req.body is undefined
	if (!req.body) return res.status(401).json({ error: 'No req body' })

	// Get the user email and webhook type from the request body
	const { alert_name, email } = req.body || {}

	const emailLookup: string = email ? email.toLowerCase() : req.body.customer_email_address?.toLowerCase()

	// If no email, return 404
	if (!emailLookup) return res.status(402).json({ error: 'No email' })

	// Find the user from the email
	let { data: returned } = await supabaseAdmin.from('userdata').select().eq('email', emailLookup)

	// If not found, try again in a few seconds
	if (!returned || !returned[0]) {
		let wait = alert_name === 'subscription_created' ? 4000 : 2000
		await sleep(wait)

		let { data: returned } = await supabaseAdmin.from('userdata').select().eq('email', emailLookup)

		if (!returned || !returned[0]) return res.status(404).json({ error: 'No data returned' })
	}

	// User was found -- proceed to update the user's details
	let user = returned ? returned[0] : null

	if (alert_name) {
		// delay subscription_created to wait for subscription_payment_succeeded to finish
		if (alert_name === 'subscription_created') {
			let waited = 0
			while (!user.receipt_url && waited < 8000) {
				await sleep(2000)
				waited += 2000

				let { data: returnedAgain } = await supabaseAdmin.from('userdata').select().eq('email', emailLookup)

				if (!returnedAgain) return res.status(406).json({ error: 'No data returned' })

				user = returnedAgain ? returnedAgain[0] : null
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
			paused_from
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
		if (cancellation_effective_date) user.cancelled_date = cancellation_effective_date
		if (paused_from) user.paused_date = paused_from

		const { data, error } = await supabaseAdmin.from('userdata').update(user).eq('id', user.id)

		if (error) {
			return res.status(407).json({ error })
		} else if (data) {
			return res.status(200).json({ success: 'Webhook received and processed successfully' })
		}
	}

	return res.status(408).json({ error: 'No alert_name found' })
}
