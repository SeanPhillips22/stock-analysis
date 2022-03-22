import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Extract the key and path from the request
	const key = req.query.key[0]
	const path = req.query.path[0]

	// Check for secret to confirm this is a valid request
	if (key !== process.env.REVAL_KEY) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	try {
		await res.unstable_revalidate(path)
		return res.json({ revalidated: true })
	} catch (err) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		return res.status(500).send('Error revalidating')
	}
}
