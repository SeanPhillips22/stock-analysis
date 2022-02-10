import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Mobile1Article() {
	const { path } = useLayoutContext()
	const checked = authState(state => state.checked)
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (!checked || (checked && !isPro)) {
		return (
			<>
				<div className="ad-banner m-1a">
					<ins
						className="adsbygoogle m-1"
						data-ad-client="ca-pub-7702053427535735"
						data-ad-slot="9694172988"
						data-full-width-responsive="false"
					></ins>
					<AdsenseScript />
				</div>
			</>
		)
	}

	return null
}
