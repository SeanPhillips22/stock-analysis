import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Sidebar1Wide() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="sb1widew">
				<div className="adph sb1wide"></div>
			</div>
		)
	}

	return (
		<div className="sb1widew">
			<ins
				className="adsbygoogle sb1wide"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="8582549443"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</div>
	)
}
