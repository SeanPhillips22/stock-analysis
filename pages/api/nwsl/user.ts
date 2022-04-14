/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Sync users between Supabase auth and Mailerlite.
 * When a user is added or modified in Supabase, it sends a POST request to this endpoint.
 */
export default async function newsletter(req: NextApiRequest, res: NextApiResponse) {
	const { email } = JSON.parse(req.body) || {}

	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'X-MailerLite-ApiDocs': 'true',
			'Content-Type': 'application/json',
			'X-MailerLite-ApiKey': process.env.MAILERLITE!
		},
		body: JSON.stringify({ email: email, resubscribe: false, autoresponders: true, type: 'null' })
	}

	try {
		await fetch('https://api.mailerlite.com/api/v2/groups/52345884972680532/subscribers', options)
		return res.status(200).json({ message: 'success' })
	} catch (e) {
		console.error(e)
		return res.status(400).json({ message: 'error' })
	}
}
