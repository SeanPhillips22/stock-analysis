import { useAuthState } from 'hooks/useAuthState'
import { useNavState } from 'hooks/useNavState'
import Script from 'next/script'
import { useEffect } from 'react'
import { noAds } from '../noAds'

// declare adsbygoogle to prevent type error
declare global {
	interface Window {
		adsbygoogle: any
	}
}

// fill the slot with an AdSense ad
function loadAdsense() {
	try {
		const adsbygoogle = window.adsbygoogle || []
		adsbygoogle.push({})
	} catch (e) {
		console.error(e)
	}
}

export function Sidebar1() {
	const { path } = useNavState()

	useEffect(() => {
		if (noAds(path.one)) return // no ads for this page

		// check if AdSense script is loaded every 300ms
		let count = 0 // count attempts
		let interval = setInterval(() => {
			count++

			// if adsbygoogle is defined, then the script is loaded
			if (window.adsbygoogle) {
				loadAdsense()
				clearInterval(interval)
			}

			// stop after 20 attempts (6 seconds)
			// usually this works on the first attempt
			if (count === 20) clearInterval(interval)
		}, 300)

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const { checked, isPro } = useAuthState()

	if (noAds(path.one)) {
		return null
	}

	if (!checked || (checked && !isPro)) {
		return (
			<>
				<div id="ad-banner" className="mx-auto text-center hidden lg:block">
					<ins
						className="adsbygoogle"
						style={{
							display: 'block',
							width: '300px',
							height: '250px',
							margin: '0 auto'
						}}
						data-ad-client="ca-pub-7702053427535735"
						data-ad-slot="8582549443"
					></ins>
				</div>
				<Script
					id="adsense-script"
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
					crossOrigin="anonymous"
				/>
			</>
		)
	}

	return null
}
