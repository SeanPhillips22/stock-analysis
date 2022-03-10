import Script from 'next/script'
import { authState } from 'state/authState'

export function AdsenseScript() {
	const checked = authState(state => state.checked)
	const isPro = authState(state => state.isPro)

	if (checked && !isPro) {
		return (
			<Script
				id="adsense-script"
				strategy="afterInteractive"
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
				crossOrigin="anonymous"
			/>
		)
	}

	return null
}
