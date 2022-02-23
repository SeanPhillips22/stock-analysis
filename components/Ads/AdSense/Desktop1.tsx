import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Desktop1() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="d1w">
				<div className="adph d1"></div>
			</div>
		)
	}

	return (
		<aside className="ad-banner d1w">
			<ins
				className="adsbygoogle d1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="1165821987"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
