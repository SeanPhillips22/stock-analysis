import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Mobile1Article() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ad-banner m1aw">
				<div className="adph m-1"></div>
			</div>
		)
	}

	return (
		<>
			<div className="ad-banner m1aw">
				<ins
					className="adsbygoogle m-1"
					data-ad-client="ca-pub-7702053427535735"
					data-ad-slot="9694172988"
					data-full-width-responsive="false"
				></ins>
			</div>
			<AdsenseScript />
		</>
	)
}