/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'functions/supabase'
import { userdata } from './wp_userdata'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const email = userdata[3].email
	const name = userdata[3].name
	const status = userdata[3].status
	const role = userdata[4].role
	const plan = userdata[4].plan
	const update_url = userdata[4].update_url
	const cancel_url = userdata[4].cancel_url
	const receipt_url = userdata[4].receipt_url
	const payment_method = userdata[4].payment_method
	const currency = userdata[4].currency
	const next_bill_date = userdata[4].next_bill_date
	const next_payment_amount = userdata[4].next_payment_amount
	const unit_price = userdata[4].unit_price
	const subscription_id = userdata[4].subscription_id
	const subscription_plan_id = userdata[4].subscription_plan_id
	const registered_date = userdata[4].registered_date
	const cancelled_date = userdata[4].cancelled_date
	const paused_date = userdata[4].paused_date
	const alert_name = userdata[4].alert_name
	const event_time = userdata[4].event_time

	const { user, error } = await supabase.auth.signUp(
		{
			email: email,
			password: 'SAtemp1114',
		},
		{
			data: {
				name,
				status,
				role,
				plan,
				update_url,
				cancel_url,
				receipt_url,
				payment_method,
				currency,
				next_bill_date,
				next_payment_amount,
				unit_price,
				subscription_id,
				subscription_plan_id,
				registered_date,
				cancelled_date,
				paused_date,
				alert_name,
				event_time,
			},
		}
	)

	if (user) {
		res.status(200).json({ status: 'added', code: JSON.stringify(user) })
	} else {
		res.status(400).json({
			status: 'error',
			user: JSON.stringify(user),
			code: JSON.stringify(error),
		})
	}
}
