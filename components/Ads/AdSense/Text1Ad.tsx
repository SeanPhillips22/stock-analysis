/* eslint-disable @typescript-eslint/no-unused-vars */
import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'
// import { cn } from 'functions/helpers/classNames'

type Props = {
	mobileOnly?: boolean
}

export function Text1Ad({ mobileOnly }: Props) {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return (
			<div className="ad-banner m1aw">
				<div className="adph m-1"></div>
			</div>
		)
	}

	return (
		<>
			<div className="ad-banner m1aw">
				<ins
					className="adsbygoogle m-1"
					data-ad-client="ca-pub-7702053427535735"
					data-ad-slot="3871188988"
					data-ad-format="auto"
					data-full-width-responsive="true"
				></ins>
			</div>
			<AdsenseScript />
		</>
	)
}
