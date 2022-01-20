import { useEffect, useState } from 'react'
import Script from 'next/script'
import { getAdsForPage } from './Loading/getAdsForPage'
import { useNavState } from 'hooks/useNavState'
import { useLoadAds } from './Loading/_useLoadAds'
import { noAds } from '../noAds'

export function LoadAds() {
	const [ads, setAds] = useState<string[]>([])
	const { path } = useNavState()
	useLoadAds()

	useEffect(() => {
		setAds(getAdsForPage(path))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (
		typeof window === 'undefined' ||
		process.env.NODE_ENV === 'development' ||
		ads.length === 0 ||
		noAds(path.one)
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
					)} } }
					
					window.addEventListener("adnginLoaderReady", function() {
          adngin.queue.push(function() {
            googletag.cmd.push(function(){
              googletag.pubads().set("page_url", "stockanalysis.com");
            });
          });
        });`
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
