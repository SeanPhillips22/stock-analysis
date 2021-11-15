/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabaseAdmin } from 'functions/supabaseAdmin'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { alert_name, email } = req.body

	const { data: returned } = await supabaseAdmin
		.from('userdata')
		.select()
		.eq('email', email)

	if (!returned) return res.status(400).json({ error: 'No data returned' })

	const user = returned![0]

	if (alert_name) {
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
			return res.status(200).json({ success: data })
		}
	}

	return res.status(400).json({ error: 'No alert_name found' })
}
