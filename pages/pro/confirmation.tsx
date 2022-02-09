import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'

export default function FreeTrial() {
	return (
		<>
			<SEO
				title="Confirmation"
				canonical="/pro/confirmation/"
				noindex={true}
			/>
			<UserLayout url="/pro/confirmation/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="text-3xl bp:text-4xl font-bold mb-5 text-gray-800">
						Free Trial Confirmed
					</h1>

					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						Congrats, your free trial subscription has been activated!
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						You are now logged in and can start using the site with
						unlimited access to all of our features.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						When you need to log in again, just enter your email on the
						login page to receive a login link.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						If you have any problems, reply to the email or send a message
						to support@stockanalysis.com.
					</p>
					<p className="text-lg sm:text-xl text-gray-900 leading-relaxed">
						Best,
						<br />
						The Stock Analysis Team
					</p>
				</div>
			</UserLayout>
		</>
	)
}
