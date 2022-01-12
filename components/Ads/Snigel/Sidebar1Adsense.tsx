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

	// Fill the slot with an AdSense ad
	function loadAdsense() {
		try {
			let adsbygoogle = window.adsbygoogle
			console.log({ adsbygoogle })
			adsbygoogle.push({})
		} catch (e) {
			console.error(e)
		}
	}

	// Check if AdSense script is loaded every 300ms
	useEffect(() => {
		let interval = setInterval(() => {
			if (window.adsbygoogle) {
				loadAdsense()
				clearInterval(interval)
			}
		}, 300)

		return () => clearInterval(interval)
	}, [])

	const { checked, isPro } = useAuthState()

	if (!checked || (checked && !isPro)) {
		return (
			<>
				<div id="ad-banner" className="mx-auto text-center hidden lg:block">
					<ins
						className="adsbygoogle"
						style={{ display: 'block', width: '300px', height: '250px' }}
						data-ad-client="ca-pub-7702053427535735"
						data-ad-slot="8582549443"
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
