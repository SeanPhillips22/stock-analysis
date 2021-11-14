/* eslint-disable camelcase */
import { SEO } from 'components/SEO'
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth'
import { LoginPrompt } from 'components/LoginPrompt'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { CrispChat } from 'components/Scripts/CrispChat'
import { useAuth } from 'hooks/useAuth'
import { supabase } from 'functions/client'
import { formatDateClean } from 'functions/formatDates'

export default function MyAccount() {
	const { isLoggedIn } = useAuth()
	const [userInfo, setUserInfo] = useState<any>()

	useEffect(() => {
		getUserInfo()
	}, [])

	async function getUserInfo() {
		const { data: profile } = await supabase
			.from('userdata')
			.select(
				'email, status, role, plan, update_url, cancel_url, receipt_url, payment_method, currency, next_bill_date, next_payment_amount, unit_price, subscription_id, subscription_plan_id, registered_date, cancelled_date, paused_date'
			)

		if (profile) {
			setUserInfo(profile[0])
		}
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
		registered_date = undefined,
	} = userInfo ? userInfo : {}

	console.log(userInfo)

	return (
		<>
			<SEO title="My Account" canonical="/pro/my-account/" noindex={true} />
			<CrispChat />
			<LayoutFullWidth>
				<div className="max-w-3xl mx-auto px-4 xs:px-6 py-8 xs:py-12 space-y-6 xs:space-y-8">
					{isLoggedIn ? (
						<>
							<h1 className="text-3xl xs:text-4xl font-bold mb-5 pb-4 text-gray-800 border-b-2 border-gray-800">
								My Account
							</h1>
							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">User Information</h2>
								{email && (
									<div>
										<strong>Email Address:</strong> {email}
									</div>
								)}
								{registered_date && (
									<div>
										<strong>Registered Date:</strong>{' '}
										{formatDateClean(registered_date)}
									</div>
								)}
							</div>
							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">Manage Subscription</h2>
								{status && (
									<div className="mb-2">
										<strong>Status:</strong> {status}
									</div>
								)}
								{next_bill_date && (
									<div>Next Payment Date: {next_bill_date}</div>
								)}
								{next_payment_amount && next_payment_amount !== '0' && (
									<div>
										Amount: {next_payment_amount}{' '}
										{currency && currency}
									</div>
								)}
								{payment_method && (
									<div>
										Payment Method:{' '}
										{payment_method.charAt(0).toUpperCase() +
											payment_method.slice(1)}
									</div>
								)}
								{update_url && (
									<div>
										<a
											href={update_url}
											target="_blank"
											rel="nofollow noopener noreferrer"
											className="bll"
										>
											Update Payment Details
										</a>
									</div>
								)}
								{cancel_url && (
									<div className="mt-3">
										<a
											href={cancel_url}
											target="_blank"
											rel="nofollow noopener noreferrer"
											className="bll"
										>
											Cancel Subscription
										</a>
									</div>
								)}
							</div>

							<div className="border border-gray-200 p-3 xs:p-4 rounded-md text-base xs:text-lg">
								<h2 className="hh2">Get Support</h2>
								<div className="mb-4">
									<strong>Here&apos;s how to get support:</strong>
								</div>

								<ol className="list-decimal ml-8">
									<li className="mb-2">
										Click the blue chat widget in the bottom right
										corner.
									</li>
									<li className="mb-2">
										Send an email to support@stockanalysis.com.
									</li>
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
			</LayoutFullWidth>
		</>
	)
}
