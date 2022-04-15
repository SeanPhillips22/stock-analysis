import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Text3Ad() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ad-banner text-wrap">
				<div className="adph text3"></div>
			</div>
		)
	}

	return (
		<>
			<div className="ad-banner text-wrap">
				<ins
					className="adsbygoogle text3"
					data-ad-client="ca-pub-7702053427535735"
					data-ad-slot="6478763346"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
			</div>
			<AdsenseScript />
		</>
	)
}
