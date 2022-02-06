import Script from 'next/script'

export function AdsenseScript() {
	return (
		<Script
			id="adsense-script"
			strategy="afterInteractive"
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
			crossOrigin="anonymous"
		/>
	)
}
