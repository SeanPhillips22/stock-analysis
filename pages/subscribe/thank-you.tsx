import { FocusedLayout } from 'components/Layout/FocusedLayout'
import { SEO } from 'components/SEO'

export default function ThankYou() {
	return (
		<>
			<SEO title="Thank you!" canonical="/subscribe/thank-you/" noindex={true} />
			<FocusedLayout url="/subscribe/thank-you/">
				<div className="mx-auto max-w-screen-md py-20 px-5 xs:px-6">
					<h1 className="hh1 text-4xl">Thank you!</h1>
					<p className="mb-5 text-base md:text-xl">
						Thank you for your interest in the Stock Analysis newsletter!
					</p>

					<p className="mb-5 text-base md:text-xl">
						Please open your email and click the verification link in the email we just sent you.
					</p>

					<p className="mb-5 text-base md:text-xl">
						We want to be absolutely certain that you want to hear from us.
					</p>
				</div>
			</FocusedLayout>
		</>
	)
}
