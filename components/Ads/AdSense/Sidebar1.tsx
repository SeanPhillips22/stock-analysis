import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Sidebar1() {
	const { path } = useLayoutContext()
	const isPro = authState((state) => state.isPro)
	useLoadAdsense()

	if (noAds(path.one) || isPro) {
		return null
	}

	return (
		<>
			<ins
				className="adsbygoogle sb-1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="8582549443"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</>
	)
}
