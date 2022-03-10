/* eslint-disable no-useless-escape */
import axios from 'axios'
import { Success } from 'components/Alerts/Success'
import { Error } from 'components/Alerts/Error'
import { SpinnerIcon } from 'components/Icons/Spinner'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ContactForm.module.css'

const defaultValues = {
	name: '',
	email: '',
	message: '',
	subject: ''
}

export function ContactForm() {
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState<boolean | null>(null)

	// The react-hook-form elements
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues
	})

	// When the form is submitted, show the spinner
	// and send the payload to /api/contact/
	// this is a custom API route that uses Postmark
	// to send the message to contact@stockanalysis.com
	async function onSubmit(formData: any) {
		setLoading(true)
		setSuccess(null)

		try {
			const res = await axios.post('/api/contact/', formData)
			const data = res.data
			if (data.status === 'email_sent') {
				setSuccess(true)
				reset(defaultValues)
			} else {
				setSuccess(false)
			}
		} catch (err) {
			setSuccess(false)
		} finally {
			setLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div>
				<label htmlFor="name">Name</label>
				<input {...register('name')} id="name" />
			</div>

			<div>
				<label htmlFor="email">
					{errors.email ? (
						<span className="error">{errors.email.message}</span>
					) : (
						'Email'
					)}
				</label>

				<input
					{...register('email', {
						required: '* Email address is required',
						pattern: {
							value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
							message: 'Your email does not appear to be valid'
						}
					})}
					id="email"
				/>
			</div>

			<div>
				<label htmlFor="subject">Subject</label>
				<input {...register('subject')} id="subject" />
			</div>

			<div>
				<label htmlFor="message">
					{errors.message ? (
						<span className="error">{errors.message.message}</span>
					) : (
						'Message'
					)}
				</label>

				<textarea
					{...register('message', {
						required: '* Message is required',
						minLength: {
							value: 10,
							message: '* This is too short to be a meaningful message'
						}
					})}
					rows={4}
					id="message"
				/>
			</div>

			<button type="submit">
				{loading ? (
					<>
						<SpinnerIcon /> Sending...
					</>
				) : (
					'Send Message'
				)}
			</button>

			{success !== null && (
				<div className="my-8">
					{success === true ? (
						<Success message="Your message was sent successfully. We will get back to you soon." />
					) : (
						<Error message="There was an error sending your message. Please send an email directly to contact@stockanalysis.com instead." />
					)}
				</div>
			)}
		</form>
	)
}
