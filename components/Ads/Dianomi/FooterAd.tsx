import { useEffect } from 'react'
import { navState } from 'state/navState'
import Script from 'next/script'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		dianomiReloadContext: any
	}
}

// Dianomi ad in the footer
export default function FooterAd() {
	const path = navState(state => state.path)

	useEffect(() => {
		if (typeof window.dianomiReloadContext !== 'undefined') {
			window.dianomiReloadContext()
		}
	}, [path])

	if (process.env.NODE_ENV === 'development') {
		return (
			<div className="max-w-[970px] min-h-[280px] mx-auto px-3 xs:px-4 lg:px-0 my-10 bg-blue-100"></div>
		)
	}

	return (
		<>
			<div
				id="ad-banner"
				className="dianomi_context max-w-[970px] min-h-[310px] pb-4 mx-auto px-3 xs:px-4 lg:px-0 mt-10 mb-3"
				data-dianomi-context-id="443"
			></div>
			<Script
				strategy="lazyOnload"
				src="https://www.dianomi.com/js/contextfeed.js"
				id="dianomi_context_script"
			/>
		</>
	)
}
