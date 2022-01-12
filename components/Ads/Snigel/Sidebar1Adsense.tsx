import { useAuthState } from 'hooks/useAuthState'
import Script from 'next/script'
import { useEffect } from 'react'
// import { navState } from 'state/navState'
// import { noAds } from 'components/Ads/noAds'

declare global {
	interface Window {
		adsbygoogle: any
	}
}

export function Sidebar1Adsense() {
	// const path = navState((state) => state.path)

	useEffect(() => {
		if (window.adsbygoogle) {
			window.adsbygoogle.push()
		}
	}, [])

	const { checked, isPro } = useAuthState()

	if (!checked || (checked && !isPro)) {
		return (
			<>
				<div id="ad-banner" className="mx-auto text-center hidden lg:block">
					<ins
						className="adsbygoogle"
						style={{ display: 'block' }}
						data-ad-client="ca-pub-7702053427535735"
						data-ad-slot="8582549443"
						data-ad-format="auto"
						data-full-width-responsive="true"
					></ins>
				</div>
				<Script
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
					crossOrigin="anonymous"
				/>
			</>
		)
	}

	return null
}
