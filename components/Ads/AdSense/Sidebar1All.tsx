import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

/**
 * Sidebar unit that shows on all devices
 * mobile: rectangle
 * tablet: leaderboard
 * desktop: rectangle
 */
export function Sidebar1All() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return <div className="adph sb-1a"></div>
	}

	return (
		<>
			<ins
				className="adsbygoogle sb-1a"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="8582549443"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</>
	)
}
