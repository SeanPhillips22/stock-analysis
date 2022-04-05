import { Button } from 'components/Buttons/Button'
import { UserLayout } from 'components/Layout/UserLayout'
import { useEvent } from 'hooks/useEvent'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Error({ statusCode }: any) {
	const router = useRouter()
	const { event } = useEvent()

	useEffect(() => {
		event('Error', { statusCode })
	}, [event, statusCode])

	return (
		<UserLayout url={router.asPath}>
			<Head>
				<title>An error occurred | Stock Analysis</title>
			</Head>
			<div className="hh1 mb-2">An error occurred</div>
			<div className="mt-5 leading-relaxed lg:text-xl">
				Our admins will attempt to fix the error as soon as possible. If you need it fixed immediately, please send
				us a message via the{' '}
				<Link href="/contact/" prefetch={false}>
					<a className="bll">contact form</a>
				</Link>{' '}
				or email us directly at support@stockanalysis.com.
			</div>
			<Button text="Back to home page" url="/" className="mt-8" />
			<div className="mt-12 text-base leading-relaxed lg:text-base">
				{statusCode ? `Server error. Status code: ${statusCode}` : 'Client error.'}
			</div>
		</UserLayout>
	)
}

Error.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
