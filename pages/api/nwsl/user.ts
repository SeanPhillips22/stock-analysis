/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from 'next'
const postmark = require('postmark')

const KEY = process.env.POSTMARK_SERVER_API_TOKEN || ''

/**
 * Sync users between Supabase auth and Mailerlite.
 * When a user is added or modified in Supabase, it sends a POST request to this endpoint.
 */
export default async function newsletter(req: NextApiRequest, res: NextApiResponse) {
	const client = new postmark.Client(KEY)

	// Get the params from the request
	const { record, old_record } = req.body || {}
	if (!record) return res.status(401).json({ message: 'no_record_found' })

	const { email, status, plan } = record
	const { old_status } = old_record || {}

	const obj = {
		From: 'support@stockanalysis.com',
		ReplyTo: 'support@stockanalysis.com',
		To: 'contact@stockanalysis.com',
		Subject: 'Usersync webhook',
		TextBody: JSON.stringify(req.body)
	}

	// Send debug email
	await client.sendEmail(obj)

	const options = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'X-MailerLite-ApiDocs': 'true',
			'Content-Type': 'application/json',
			'X-MailerLite-ApiKey': process.env.MAILERLITE!
		},
		body: JSON.stringify({
			email,
			resubscribe: true,
			autoresponders: true,
			type: 'null',
			fields: {
				user_status: status,
				user_plan: plan
			}
		})
	}

	try {
		await fetch('https://api.mailerlite.com/api/v2/groups/52345884972680532/subscribers', options)
		return res.status(200).json({ message: 'success' })
	} catch (e) {
		console.error(e)
		return res.status(400).json({ message: 'error' })
	}
}
