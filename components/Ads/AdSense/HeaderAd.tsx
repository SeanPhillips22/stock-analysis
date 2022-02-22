import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function HeaderAd() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (!path.one || noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ha1w">
				<div className="adph ha1"></div>
			</div>
		)
	}

	return (
		<aside className="ad-banner ha1w">
			<ins
				className="adsbygoogle ha1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="1021894904"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
