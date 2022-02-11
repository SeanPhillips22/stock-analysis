import { useEffect } from 'react'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import Script from 'next/script'
import { isDev } from '../noAds'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		dianomiReloadContext: any
	}
}

// Dianomi ad in the footer
export default function FooterAd() {
	const { path } = useLayoutContext()

	useEffect(() => {
		if (typeof window.dianomiReloadContext !== 'undefined') {
			window.dianomiReloadContext()
		}
	}, [path])

	if (isDev()) {
		return <div className="adph ftdia"></div>
	}

	return (
		<>
			<div
				id="ad-banner"
				className="dianomi_context ftdia"
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
