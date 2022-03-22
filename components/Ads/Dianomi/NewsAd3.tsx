import { useEffect } from 'react'
import Script from 'next/script'
import { isDev } from '../noAds'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		dianomiReloadContext: any
	}
}

export default function NewsAd3() {
	useEffect(() => {
		if (typeof window.dianomiReloadContext !== 'undefined') {
			window.dianomiReloadContext()
		}
	}, [])

	if (isDev()) {
		return <div className="adph nwsdia"></div>
	}

	return (
		<>
			<div id="ad-banner" className="dianomi_context nwsdia" data-dianomi-context-id="1046"></div>
			<Script strategy="lazyOnload" src="https://www.dianomi.com/js/contextfeed.js" id="dianomi_context_script" />
		</>
	)
}
