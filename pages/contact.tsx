import { FormEvent, useState } from 'react'
import { SEO } from 'components/SEO'
import { Success } from 'components/Alerts/Success'
import { Error } from 'components/Alerts/Error'
import { Warning } from 'components/Alerts/Warning'
import Axios from 'axios'
import { SpinnerIcon } from 'components/Icons/Spinner'
import { validateEmailAddress, validateLength } from 'functions/validation'
import { CrispChat } from 'components/Scripts/CrispChat'
import { LayoutSidebar } from 'components/Layout/LayoutSidebar'

interface MessageData {
	[key: string]: string
}

export default function Contact() {
	return (
		<>
			<SEO
				title="Contact Us"
				description="This page contains a contact form. Use this form if you have questions or suggestions about the content on this site."
				canonical="/contact/"
			/>
			<CrispChat />
			<LayoutSidebar heading="Contact Us" url="/contact/">
				<p>
					We would love to hear from you. Please submit a message using the
					contact form below and we will get back to you as soon as
					possible. You can also send an email directly to{' '}
					<a className="bll" href="mailto:contact@stockanalysis.com">
						contact@stockanalysis.com
					</a>
					.
				</p>
				<ContactForm />
			</LayoutSidebar>
		</>
	)
}

function ContactForm() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [subject, setSubject] = useState('')
	const [responseType, setResponseType] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [warning, setWarning] = useState<string | null>(null)

	const url = '/api/contact/'

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()

		setResponseType(null)
		setWarning(null)

		if (!validateEmailAddress(email)) {
			return setWarning('Please enter a valid email address.')
		}

		if (!validateLength(message, 10)) {
			return setWarning(
				'Your message is too short to be meaningful. Add more details.'
			)
		}

		setLoading(true)
		try {
			const messageData: MessageData = {
				name,
				email,
				subject,
				message
			}

			const res = await Axios.post(url, messageData)
			const data = res.data

			if (data.status === 'email_sent') {
				setResponseType('success')
				setName('')
				setEmail('')
				setSubject('')
				setMessage('')
			} else {
				setResponseType('error')
			}
		} catch (err) {
			console.error({ err })
			setResponseType('error')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="bg-white">
			<div className="relative mx-auto px-2">
				{warning && <Warning message={warning} />}
				<div className="mt-4">
					<form
						action="#"
						method="POST"
						className="space-y-6"
						onSubmit={handleSubmit}
					>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700"
							>
								Name
							</label>
							<div className="mt-1">
								<input
									type="text"
									name="name"
									id="name"
									autoComplete="given-name"
									className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									value={name}
									onChange={event => setName(event.target.value)}
								/>
							</div>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700"
							>
								Email
							</label>
							<div className="mt-1">
								<input
									name="email"
									type="email"
									id="email"
									autoComplete="email"
									required
									className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									value={email}
									onChange={event => setEmail(event.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="subject"
								className="block text-sm font-medium text-gray-700"
							>
								Subject
							</label>
							<div className="mt-1">
								<input
									name="subject"
									type="text"
									id="subject"
									autoComplete="off"
									className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									value={subject}
									onChange={event => setSubject(event.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700"
							>
								Message
							</label>
							<div className="mt-1">
								<textarea
									id="message"
									name="message"
									required
									rows={4}
									className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
									value={message}
									onChange={event => setMessage(event.target.value)}
								/>
							</div>
						</div>
						<div className="pt-1">
							<button
								type="submit"
								className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							>
								{loading ? (
									<>
										<SpinnerIcon /> Sending...
									</>
								) : (
									'Send Message'
								)}
							</button>
						</div>
					</form>
				</div>

				{responseType && (
					<div className="my-8">
						{responseType === 'success' ? (
							<Success message="Your message was sent successfully. We will get back to you soon." />
						) : (
							<Error message="There was an error sending your message. Please send an email directly to contact@stockanalysis.com instead." />
						)}
					</div>
				)}
			</div>
		</div>
	)
}
