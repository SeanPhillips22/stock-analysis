import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from 'functions/supabase'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (user) {
		res.status(200).json({
			message: 'You are logged in',
			user,
		})
	} else {
		res.status(401).json({
			message: 'You are not logged in',
		})
	}
}
