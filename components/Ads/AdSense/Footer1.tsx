import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export default function Footer1() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ad-banner ftadw">
				<div className="adphb ftad"></div>
			</div>
		)
	}

	return (
		<>
			<div className="ad-banner ftadw">
				<ins
					className="adsbygoogle ftad"
					data-ad-client="ca-pub-7702053427535735"
					data-ad-slot="4737940334"
					data-full-width-responsive="false"
				></ins>
			</div>
			<AdsenseScript />
		</>
	)
}
