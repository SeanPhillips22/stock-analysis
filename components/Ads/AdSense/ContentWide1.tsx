import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function ContentWide1() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ad-banner cw1w">
				<div className="adph cw1"></div>
			</div>
		)
	}

	return (
		<aside className="ad-banner cw1w">
			<ins
				className="adsbygoogle cw1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="8890793988"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
