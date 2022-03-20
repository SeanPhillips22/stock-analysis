import { SEO } from 'components/SEO'
import { LoginPrompt } from 'components/Pro/LoginPrompt'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CrispChat } from 'components/Scripts/CrispChat'
import { useAuthState } from 'hooks/useAuthState'
import { supabase } from 'functions/supabase'
import { formatDateClean } from 'functions/datetime/formatDates'
import { ReActivate } from 'components/Pro/MyAccount/Reactivate'
import { Layout } from 'components/Layout/_Layout'

export default function MyAccount() {
	const { isLoggedIn } = useAuthState()
	const [userInfo, setUserInfo] = useState<any>()
	const [loaded, setLoaded] = useState(false)

	useEffect(() => {
		if (isLoggedIn) {
			getUserInfo()
		}
	}, [isLoggedIn])

	async function getUserInfo() {
		const { data: profile } = await supabase
			.from('userdata')
			.select(
				'email, status, plan, update_url, cancel_url, receipt_url, payment_method, currency, next_bill_date, next_payment_amount, unit_price, registered_date, cancelled_date, paused_date'
			)

		if (profile) {
			setUserInfo(profile[0])
		}

		setLoaded(true)
	}

	const {
		email = undefined,
		status = undefined,
		update_url = undefined,
		cancel_url = undefined,
		payment_method = undefined,
		currency = undefined,
		next_bill_date = undefined,
		next_payment_amount = undefined,
		registered_date = undefined
	} = userInfo ? userInfo : {}

	let showStatus = ''
	if (status === 'active') showStatus = 'Subscription Active'
	if (status === 'trialing') showStatus = 'Free Trial Active'
	if (status === 'paused') showStatus = 'Subscription Paused'
	if (status === 'deleted') showStatus = 'Subscription Cancelled'

	const isSubscribed = status === 'active' || status === 'trialing' ? true : false

	return (
		<>
			<SEO title="My Account" canonical="/pro/my-account/" noindex={true} />
			<CrispChat />
			<Layout url="/pro/my-account/">
				<div className="mx-auto max-w-3xl space-y-6 px-4 py-8 xs:space-y-8 xs:px-6 xs:py-12">
					{isLoggedIn ? (
						<>
							<h1 className="mb-5 border-b-2 border-gray-800 pb-4 text-3xl font-bold text-gray-800 xs:text-4xl">
								My Account
							</h1>
							<div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
								<h2 className="hh2">User Information</h2>
								{email && (
									<div>
										<strong>Email Address:</strong> {email}
									</div>
								)}
								{registered_date && (
									<div>
										<strong>Registered Date:</strong> {formatDateClean(registered_date)}
									</div>
								)}
							</div>
							<div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
								<h2 className="hh2">Manage Subscription</h2>
								{showStatus && (
									<div className="mb-2">
										<strong>Status:</strong> {showStatus}
									</div>
								)}
								{isSubscribed && next_bill_date && <div>Next Payment Date: {next_bill_date}</div>}
								{isSubscribed && next_payment_amount && next_payment_amount !== '0' && (
									<div>
										Amount: {next_payment_amount} {currency && currency}
									</div>
								)}
								{isSubscribed && payment_method && (
									<div>Payment Method: {payment_method.charAt(0).toUpperCase() + payment_method.slice(1)}</div>
								)}
								{isSubscribed && update_url && (
									<div>
										<a href={update_url} target="_blank" rel="nofollow noopener noreferrer" className="bll">
											Update Payment Details
										</a>
									</div>
								)}
								{isSubscribed && cancel_url && (
									<div className="mt-3">
										<a href={cancel_url} target="_blank" rel="nofollow noopener noreferrer" className="bll">
											Cancel Subscription
										</a>
									</div>
								)}
								{loaded && !isSubscribed && <ReActivate email={email} status={status} />}
							</div>

							<div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
								<h2 className="hh2">Get Support</h2>
								<div className="mb-4">
									<strong>Here&apos;s how to get support:</strong>
								</div>

								<ol className="ml-8 list-decimal">
									<li className="mb-2">Click the blue chat widget in the bottom right corner.</li>
									<li className="mb-2">Send an email to support@stockanalysis.com.</li>
									<li>
										Send a message via the{' '}
										<Link href="/contact/" prefetch={false}>
											<a className="bll">contact form</a>
										</Link>
										.
									</li>
								</ol>
							</div>
						</>
					) : (
						<LoginPrompt />
					)}
				</div>
			</Layout>
		</>
	)
}
