import { FocusedLayout } from 'components/Layout/FocusedLayout'
import { SEO } from 'components/SEO'

export default function ThankYou() {
	return (
		<>
			<SEO
				title="Confirmed!"
				canonical="/subscribe/confirmed/"
				noindex={true}
			/>
			<FocusedLayout url="/subscribe/confirmed/">
				<div className="mx-auto max-w-screen-md py-20 px-6">
					<h1 className="hh1 mb-5 text-4xl">Confirmed!</h1>
					<p className="mb-5 text-base md:text-xl">
						Your subscription to the Stock Analysis newsletter was
						confirmed!
					</p>

					<p className="mb-5 text-base md:text-xl">
						You should see the{' '}
						<strong>first email in your inbox now.</strong>
					</p>

					<p className="mb-5 text-base md:text-xl">
						{`If you don't see it, please check your spam folder and mark the message as "not spam."`}
					</p>

					<p className="mb-5 text-base md:text-xl">
						{`Keep in mind that you can cancel at any time by clicking the unsubscribe link at the bottom of each email.`}
					</p>
				</div>
			</FocusedLayout>
		</>
	)
}
