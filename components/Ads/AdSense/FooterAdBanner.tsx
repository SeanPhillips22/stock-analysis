import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export default function FooterAdBanner() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	console.log('boo')

	if (isDev()) {
		return <div className="adph ft1"></div>
	}

	return (
		<aside className="ad-banner">
			<ins
				className="adsbygoogle ft1"
				style={{ display: 'block' }}
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="6576888157"
				data-ad-format="auto"
				data-full-width-responsive="true"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
