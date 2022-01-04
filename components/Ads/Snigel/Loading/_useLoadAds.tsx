import { useNavState } from 'hooks/useNavState'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { startAdsAuction } from './startAdsAuction'

export function useLoadAds() {
	const { path } = useNavState()
	const router = useRouter()

	useEffect(() => {
		function loadAds() {
			startAdsAuction(path)
		}

		// Load ads when the route has changed
		router.events.on('routeChangeComplete', loadAds)

		return () => {
			router.events.off('routeChangeComplete', loadAds)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
