/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from 'functions/supabaseAdmin'
import { verifyPaddleWebhook } from 'verify-paddle-webhook'

const PUBLIC_KEY = `
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAx0Wnd9QwVDS6/VtcocRB
BnosfNl8AV5WzjXs4Ne9Un8E4mEyaFhGt4cfcnPCEet1w44QcPwsucguVB4/V2hL
cY9Jy9Q0bYt00LsZIBA2tp4dak8nchuiNt7o8c96Nr7YpRqt+sgGlsoAU0hvp0wb
AgeF8Q39dN6mNh8P6J/cQ7vEqGCnSEO72Qky+VKjGCsLgZe8jC0hM+pAC6aPwJzB
g8Lc2Z0wCkV8VOHYywNTOk00cJDRcPcIaXchaWBWP4XYglBM27yBc8afKb4aIVrP
UlQolXKASysjjgGndOq/SVTXtasfIcK1AhJFsmsr8eEZvBgORYDeuFY6cDCseowe
ZqgI1nPoYyyMnXLiEA8z7J+wd6qbylSOTbc7ScDzTw9IegMKvXcY9r5YYMjxceHz
x5hUYUoH1UNmeQbP7wd7BFEi1Qxt2dFyGNQfMY+KynrwB/rzMp+8kSpX2YLQBERM
ezOSk7fdtc8jPC76CC2n0Ed8eI4xazRoVfjZYwKYnPtA65NS0/Z1jypceOAq63Hd
24s1qoV6lgssUjwVKFjhs5G7QVf1ZxmN8dKkGE3Fu5UwEgbjZ0za2O557sq+P43S
MEN4CS+/3fQrGbJayz970zbQDZAhu1tTxbjpHHiD5d+XPLQoTMhaxbI8mRk6FGGU
gi0mjSwdgb75x7akc9HMEJ0CAwEAAQ==
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

	// Check if req.body is undefined
	if (!req.body) return res.status(401).json({ error: 'No req body' })

	// Get the user email and webhook type from the request body
	const { alert_name, email } = req.body
	const emailLookup: string = email.toLowerCase()

	// Find the user from the email
	let { data: returned } = await supabaseAdmin
		.from('userdata')
		.select()
		.eq('email', emailLookup)

	// If not found, try again in a few seconds
	if (!returned || !returned[0]) {
		let wait = alert_name === 'subscription_created' ? 4000 : 2000
		await sleep(wait)

		let { data: returned } = await supabaseAdmin
			.from('userdata')
			.select()
			.eq('email', emailLookup)

		if (!returned || !returned[0])
			return res.status(404).json({ error: 'No data returned' })
	}

	// User was found -- proceed to update the user's details
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
					.eq('email', emailLookup)

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
			return res.status(407).json({ error })
		} else if (data) {
			return res
				.status(200)
				.json({ success: 'Webhook received and processed successfully' })
		}
	}

	return res.status(408).json({ error: 'No alert_name found' })
}
