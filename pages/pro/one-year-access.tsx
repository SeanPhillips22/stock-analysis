import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { useModifyUser } from 'components/Pro/Payments/useModifyUser'
import { usePaddleCheckout } from 'components/Pro/Payments/usePaddleCheckout'
import { useAuthState } from 'auth/useAuthState'
import { useEvent } from 'hooks/useEvent'

export default function OneYearAccessPage() {
	const { user } = useAuthState()
	const { event } = useEvent()
	const { modifyOrCreateUser } = useModifyUser()
	usePaddleCheckout()

	async function checkoutComplete(data: any) {
		await modifyOrCreateUser(
			data,
			'active',
			'Stock Analysis Pro - 1 Year Access',
			'/pro/confirmation1y/',
			user?.email
		)
	}

	return (
		<>
			<SEO title="1-Year Access to Stock Analysis Pro" canonical="/pro/one-year-access/" noindex={true} />
			<UserLayout url="/pro/one-year-access/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">
						1-Year Access to Stock Analysis Pro
					</h1>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Use the checkout link below to purchase your 1-year access to Stock Analysis Pro.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						The price is $79.00 for the full year, just a one-time payment with no recurring billing.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						This is a 33% discount off of the full price of $9.99 per month.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						If you have any questions or problems, please send a message to support@stockanalysis.com.
					</p>
					<button
						onClick={() => {
							// eslint-disable-next-line no-undef
							window.Paddle.Checkout.open({
								product: 760591, // Production: 760591, Sandbox: 27192
								successCallback: checkoutComplete,
								email: user?.email
							})
							event('Checkout', { type: 'One_Year_Access' })
						}}
						id="start-trial"
						className="block w-full cursor-pointer bg-blue-brand_light p-4 text-center text-2xl text-white hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Purchase 1-Year Access
					</button>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Best,
						<br />
						The Stock Analysis Team
					</p>
				</div>
			</UserLayout>
		</>
	)
}
