import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getAdsForPage } from './Loading/getAdsForPage'
import { useNavState } from 'hooks/useNavState'
import { useLoadAds } from './Loading/_useLoadAds'

// declare global {
// 	// eslint-disable-next-line no-unused-vars
// 	interface Window {
// 		adngin: any
// 	}
// }

export function LoadAds() {
	const [ads, setAds] = useState<string[]>([])
	const { path } = useNavState()
	useLoadAds()

	useEffect(() => {
		setAds(getAdsForPage(path))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// useEffect(() => {
	// 	let adsArray = getAdsForPage(path)

	// 	setAds(adsArray)
	// 	if (
	// 		adsArray.length > 0 &&
	// 		window.adngin &&
	// 		window.adngin.adnginLoaderReady
	// 	) {
	// 		window.adngin.queue.push(function () {
	// 			if (window.innerWidth) {
	// 				if (window.innerWidth >= 768) {
	// 					adsArray = adsArray.filter(
	// 						(ad) => ad !== 'in-content_1_mobile'
	// 					)
	// 				} else if (window.innerWidth < 768) {
	// 					adsArray = adsArray.filter(
	// 						(ad) =>
	// 							ad === 'in-content_1_mobile' || ad === 'top_leaderboard'
	// 					)
	// 				}
	// 			}

	// 			window.adngin.cmd.startAuction(adsArray)
	// 		})
	// 	}
	// }, [path])

	if (
		typeof window === 'undefined' ||
		process.env.NODE_ENV === 'development' ||
		ads.length === 0
	) {
		return null
	}

	return (
		<>
			<Script
				id="snigel-initial-ads"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `window.snigelPubConf = { "adengine": { "activeAdUnits": ${JSON.stringify(
						ads
					)} } }`
				}}
			/>
			<Script
				id="snigel-script"
				strategy="afterInteractive"
				src="https://cdn.snigelweb.com/adengine/stockanalysis.com/loader.js"
			/>
		</>
	)
}
