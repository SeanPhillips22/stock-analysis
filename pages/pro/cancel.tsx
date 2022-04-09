import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'

export default function FreeTrial() {
	return (
		<>
			<SEO title="Cancel Subscription" canonical="/pro/cancel/" noindex={true} />
			<UserLayout url="/pro/cancel/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">Are you sure?</h1>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Are you sure you want to cancel the subscription?
					</p>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						The price is likely to go up in the future. If you stay subscribed now then you will be locked in to
						the current price.
					</p>
				</div>
			</UserLayout>
		</>
	)
}
