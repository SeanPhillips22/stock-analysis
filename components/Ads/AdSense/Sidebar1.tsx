import { authState } from 'state/authState'
import { navState } from 'state/navState'
import { noAds } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

export function Sidebar1() {
	const path = navState(state => state.path)
	const checked = authState(state => state.checked)
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path.one)) {
		return null
	}

	if (!checked || (checked && !isPro)) {
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

	return null
}
