import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'
import { cn } from 'functions/helpers/classNames'
import { UpgradePrompt } from 'components/Pro/UpgradePrompt'

export function HeaderAd() {
	const { path } = useLayoutContext()
	const isLoggedIn = authState(state => state.isLoggedIn)
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path)) return null

	if (isLoggedIn) {
		if (isPro || !path.one) return null
		// If logged in but not pro, show upgrade prompt
		return <UpgradePrompt />
	}

	if (isDev()) {
		return (
			<div className={cn('ha1w', !path.one ? 'home' : '')}>
				<div className="adph ha1"></div>
			</div>
		)
	}

	return (
		<aside className={cn('ad-banner ha1w', !path.one ? 'home' : '')}>
			<ins
				className="adsbygoogle ha1"
				data-ad-client="ca-pub-7702053427535735"
				data-ad-slot="1021894904"
				data-full-width-responsive="false"
			></ins>
			<AdsenseScript />
		</aside>
	)
}
