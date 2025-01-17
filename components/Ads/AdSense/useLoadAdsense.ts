import { useEffect } from 'react'
import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
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

export function useLoadAdsense() {
	const { path } = useLayoutContext()

	const isPro = authState(state => state.isPro)

	let isInterval = false
	let interval: any
	useEffect(() => {
		if (window.location.hash.includes('#access_token=')) return // no ads while logging in
		if (noAds(path) || isPro) return // no ads for this page

		if (window.adsbygoogle) {
			loadAdsense()
		} else {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			isInterval = true
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
		}

		return () => {
			if (isInterval) clearInterval(interval)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
