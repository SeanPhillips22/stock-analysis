/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { NextApiRequest, NextApiResponse } from 'next'
const postmark = require('postmark') // ! Debug

const KEY = process.env.POSTMARK_SERVER_API_TOKEN || '' // ! Debug

/**
 * Sync users between Supabase auth and Mailerlite.
 * When a user is added or modified in Supabase, it sends a POST request to this endpoint.
 */
export default async function newsletter(req: NextApiRequest, res: NextApiResponse) {
	const client = new postmark.Client(KEY) // ! Debug

	// Get the params from the request
	// the "record" is the table data from Supabase
	// the "old_record" is the table data before it was changed
	const { record, old_record } = req.body || {}
	if (!record) return res.status(401).json({ message: 'no_record_found' })

	// Get the individual database fields from Supabase
	const { email, status: new_status, plan, id, name, country, currency, cancelled_date, registered_date } = record
	const { status: old_status } = old_record || {}

	// ! Debug
	const obj = {
		From: 'support@stockanalysis.com',
		ReplyTo: 'support@stockanalysis.com',
		To: 'kris@stockanalysis.com',
		Subject: 'Usersync webhook',
		TextBody: JSON.stringify(req.body)
	}

	// ! Debug
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
				user_status: new_status,
				user_plan: plan,
				user_id: id,
				user_name: name,
				user_country: country,
				user_currency: currency,
				user_cancelled_date: cancelled_date,
				user_registered_date: registered_date
			}
		})
	}

	try {
		// ? New user without a trial
		// Supabase status is empty
		// Add to the "Users" group inn MailerLite
		if (!new_status || new_status === '') {
			await fetch('https://api.mailerlite.com/api/v2/groups/52345884972680532/subscribers', options)
		}

		// ? New trial subscriber
		// Old status was empty, new status is "trialing"
		// Add to the "Pro_Users" group in Mailerlite
		else if (!old_status && new_status === 'trialing') {
			await fetch('https://api.mailerlite.com/api/v2/groups/52350318645609747/subscribers', options)
		}

		// ? Cancelled subscriber
		// New Supabase status is either "deleted" or "paused" (and wasn't "deleted" or "paused" before)
		// Add to the "Cancelled_Users" group
		else if (!['deleted', 'paused'].includes(old_status) && ['deleted', 'paused'].includes(new_status)) {
			await fetch('https://api.mailerlite.com/api/v2/groups/52351728344892742/subscribers', options)
		}

		// If none of those matched, sync the subscriber details anyway
		else {
			await fetch(`https://api.mailerlite.com/api/v2/subscribers/${email}`, {
				...options,
				method: 'PUT'
			})
		}

		return res.status(200).json({ message: 'success' })
	} catch (e) {
		console.error(e)
		return res.status(400).json({ message: 'error' })
	}
}
