import { UserLayout } from 'components/Layout/UserLayout'
import { useEvent } from 'hooks/useEvent'
import Head from 'next/head'
import { useEffect } from 'react'

export default function Custom404() {
	const { event } = useEvent()

	useEffect(() => {
		event('404')
	}, [event])

	return (
		<UserLayout url="/404/">
			<Head>
				<title>404 - Page not found | Stock Analysis</title>
			</Head>
			<div className="hh1 text-center">404 - Page Not Found</div>
			<div className="text-center text-xl leading-relaxed">
				It looks like this page was not found. Maybe try searching?
			</div>
		</UserLayout>
	)
}
