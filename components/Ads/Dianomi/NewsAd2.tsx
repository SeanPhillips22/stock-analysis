import { useEffect } from 'react'
import Script from 'next/script'

declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		dianomiReloadContext: any
	}
}

export default function NewsAd2() {
	useEffect(() => {
		if (typeof window.dianomiReloadContext !== 'undefined') {
			window.dianomiReloadContext()
		}
	}, [])

	return (
		<>
			<div
				id="ad-banner"
				className="dianomi_context min-h-[310px] diabp:min-h-[150px]"
				data-dianomi-context-id="411"
			></div>
			<Script
				strategy="lazyOnload"
				src="https://www.dianomi.com/js/contextfeed.js"
				id="dianomi_context_script"
			/>
		</>
	)
}
