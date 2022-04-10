import { supabase } from 'functions/supabase'
import { SEO } from 'components/SEO'
import { UserLayout } from 'components/Layout/UserLayout'
import { GetServerSideProps } from 'next'
import { Button } from 'components/Buttons/Button'

export default function CancelSubscription({ user }: any) {
	return (
		<>
			<SEO title="Cancel Subscription" canonical="/pro/cancel/" noindex={true} />
			<UserLayout url="/pro/cancel/">
				<div className="space-y-5 bp:space-y-6">
					<h1 className="mb-5 text-3xl font-bold text-gray-800 bp:text-4xl">Cancel subscription</h1>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						Are you sure you want to cancel the subscription?
					</p>

					<p className="text-lg leading-relaxed text-gray-900 sm:text-xl">
						If yes, click the button below to proceed.
					</p>

					<div>
						<Button url={user.user_metadata.cancel_url} text="Cancel Subscription" className="mt-2" />
					</div>
				</div>
			</UserLayout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const { user } = await supabase.auth.api.getUserByCookie(context.req)

	if (!user) {
		return { props: {}, redirect: { destination: '/login' } }
	}

	return {
		props: {
			user
		}
	}
}
