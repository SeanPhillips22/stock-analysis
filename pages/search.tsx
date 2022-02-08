import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { SEO } from 'components/SEO'
import Script from 'next/script'
import { Error } from 'components/Alerts/Error'
import { Layout } from 'components/Layout/_Layout'

export default function Search() {
	const router = useRouter()
	const [query, setQuery] = useState('')

	useEffect(() => {
		if (router.query.q && typeof router.query.q === 'string') {
			setQuery(router.query.q)
		}
	}, [router.query])

	return (
		<>
			<SEO title="Search Results" canonical="/search/" noindex={true} />
			<Script
				src="https://cse.google.com/cse.js?cx=009497841191786531325:usl8eczm65r"
				strategy="afterInteractive"
			/>
			<Layout url="/search/">
				<div className="contain min-h-[50vh]">
					<h1 className="hh1 mb-1 px-5">Search results for: {query}</h1>
					{router.isReady && !query && (
						<Error message="Please enter a search term." />
					)}
					<div className="gcse-searchresults-only"></div>
				</div>
			</Layout>
		</>
	)
}
