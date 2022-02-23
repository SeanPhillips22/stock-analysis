import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsenseDynamic } from './useLoadAdsenseDynamic'

// Home page only
// uses useLoadAdsenseDynamic to get rid of JS error
export function Mobile1Home() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsenseDynamic('(min-width: 1024px)')

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return <div className="adph m-1"></div>
	}

	return (
		<>
			<ins
				className="adsbygoogle m-1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="9694172988"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</>
	)
}
