import { useEffect } from 'react'
import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds } from '../noAds'
import useMediaQuery from 'hooks/useMediaQuery'

// declare adsbygoogle to prevent type error
declare global {
	interface Window {
		adsbygoogle: any
	}
}

// fill the slot with an AdSense ad
function loadAdsense() {
	try {
		console.log('load')
		const adsbygoogle = window.adsbygoogle || []
		adsbygoogle.push({})
	} catch (e) {
		console.error(e)
	}
}

// Conditionally load Adsense depending on the screen size
// Media query format: (min-width: 1024px)
// If it matches, the ad won't be shown
// The code above hides the ad on screens 1024px and larger
export function useLoadAdsenseDynamic(mediaQuery: string) {
	const { path } = useLayoutContext()
	const isHidden = useMediaQuery(mediaQuery)

	const isPro = authState(state => state.isPro)

	useEffect(() => {
		if (noAds(path) || isPro) return // no ads for this page
		if (isHidden) return // no ads for this screen size

		console.log('useEffect')

		// check if AdSense script is loaded every 200ms
		let count = 0 // count attempts
		let interval = setInterval(() => {
			count++

			// if adsbygoogle is defined, then the script is loaded
			if (window.adsbygoogle) {
				loadAdsense()
				clearInterval(interval)
			}

			// stop after 20 attempts (4 seconds)
			// usually this works on the first attempt
			if (count === 20) clearInterval(interval)
		}, 200)

		return () => clearInterval(interval)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
