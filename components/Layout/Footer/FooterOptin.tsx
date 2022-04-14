import { useEvent } from 'hooks/useEvent'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function FooterOptin() {
	const [email, setEmail] = useState('')
	const { event } = useEvent()
	const router = useRouter()

	// Submit the optin form
	async function handleSubmit(e: any) {
		e.preventDefault()
		let response = await fetch('/api/newsletter/', {
			body: JSON.stringify({ email }),
			method: 'POST'
		})

		if (response.ok) {
			// If success
			event('Newsletter', { location: 'Footer', status: 'Success' })
			router.push('/subscribe/thank-you/')
		} else {
			// If not success
			event('Newsletter', { location: 'Footer', status: 'Error', details: response.statusText })
			toast.error('There was an error. Please contact support@stockanalysis.com.')
		}
	}

	return (
		<div className="mt-8 xl:mt-0">
			<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Subscribe to the newsletter</h4>
			<p className="mt-4 text-base text-gray-300">The latest updates, straight to your inbox.</p>
			<form className="mt-4 sm:flex sm:max-w-md" method="post" onSubmit={e => handleSubmit(e)}>
				<label htmlFor="email-footer" className="sr-only">
					Email address
				</label>
				<input
					className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
					type="email"
					id="email-footer"
					name="fields[email]"
					placeholder="Enter your email"
					autoComplete="email"
					value={email}
					onChange={e => setEmail(e.target.value)}
				></input>
				<div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:shrink-0">
					<input
						name="submit"
						type="submit"
						className="flex w-full cursor-pointer items-center justify-center rounded-md border border-transparent bg-blue-brand_light py-2 px-4 text-base font-medium text-white transition duration-200 hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-brand_sharp focus:ring-offset-2 focus:ring-offset-gray-800"
						value="Subscribe"
					/>
				</div>
			</form>
		</div>
	)
}
