import { supabase } from './supabase'

export async function getUserInfo() {
	const { data } = await supabase
		.from('userdata')
		.select(
			'email, status, plan, update_url, cancel_url, receipt_url, payment_method, currency, next_bill_date, next_payment_amount, unit_price, registered_date, cancelled_date, paused_date'
		)

	return data ? data[0] : null
}
