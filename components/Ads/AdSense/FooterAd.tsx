import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export default function FooterAd() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return <div className="adph ftdia"></div>
	}

	return (
		<aside className="ad-banner">
			<ins
				className="adsbygoogle"
				style={{ display: 'block' }}
				data-ad-format="autorelaxed"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="2190476077"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
