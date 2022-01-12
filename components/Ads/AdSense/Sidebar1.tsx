import { useAuthState } from 'hooks/useAuthState'
import Script from 'next/script'
import { useEffect, useState } from 'react'

declare global {
	interface Window {
		adsbygoogle: any
	}
}

export function Sidebar1() {
	const [count, setCount] = useState(0)

	// Fill the slot with an AdSense ad
	function loadAdsense() {
		try {
			const adsbygoogle = window.adsbygoogle || []
			adsbygoogle.push({})
		} catch (e) {
			console.error(e)
		}
	}

	// Check if AdSense script is loaded every 300ms
	useEffect(() => {
		let interval = setInterval(() => {
			setCount((count) => count + 1)

			console.log('count', count)
			if (window.adsbygoogle) {
				console.log('load')
				loadAdsense()
				clearInterval(interval)
			}

			if (count === 6) clearInterval(interval)
		}, 300)

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					id="adsense-script"
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7702053427535735"
					crossOrigin="anonymous"
				/>
			</>
		)
	}

	return null
}
