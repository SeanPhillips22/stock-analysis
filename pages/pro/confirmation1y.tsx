import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'

export default function ProConfirmationPage1Y() {
	return (
		<>
			<SEO title="Confirmation" canonical="/pro/confirmation1y/" noindex={true} />
			<UserLayout url="/pro/confirmation1y/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">Purchase Completed</h1>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Congrats, your 1-year access has been activated!
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						You are now logged in and can start using the site with unlimited access to all of our features.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						When you need to log in again, just enter your email on the login page to receive a login link.
					</p>
					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						If you have any problems, reply to the email or send a message to support@stockanalysis.com.
					</p>
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