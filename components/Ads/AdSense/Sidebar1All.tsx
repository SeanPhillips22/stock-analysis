import { authState } from 'state/authState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds, isDev } from '../noAds'
import { AdsenseScript } from './AdsenseScript'
import { useLoadAdsense } from './useLoadAdsense'

/**
 * Sidebar unit that shows on all devices
 * mobile: rectangle
 * tablet: leaderboard
 * desktop: rectangle
 */

// Alts: Sidebar 1B -- 4031506518
// Alts: Sidebar 1C -- 1405343174

const Control = () => (
	<>
		<ins
			className="adsbygoogle sb-1a"
			data-ad-client="ca-pub-7702053427535735"
			data-ad-slot="8582549443"
			data-full-width-responsive="false"
		></ins>
		<AdsenseScript />
	</>
)

// Test version: Sidebar 1B -- Full-width on mobile
const A = () => (
	<>
		<ins
			className="adsbygoogle sb-1a"
			data-ad-client="ca-pub-7702053427535735"
			data-ad-slot="4031506518"
			data-full-width-responsive="true"
		></ins>
		<AdsenseScript />
	</>
)

// Control version: Sidebar 1C -- Not full width on mobile
const B = () => (
	<>
		<ins
			className="adsbygoogle sb-1a"
			data-ad-client="ca-pub-7702053427535735"
			data-ad-slot="1405343174"
			data-full-width-responsive="false"
		></ins>
		<AdsenseScript />
	</>
)

export function Sidebar1All() {
	const { path } = useLayoutContext()
	const isPro = authState(state => state.isPro)
	useLoadAdsense()

	if (noAds(path) || isPro) {
		return null
	}

	if (isDev()) {
		return <div className="adph sb-1a"></div>
	}

	const ALL_GROUPS = ['A', 'B']
	type Group = typeof ALL_GROUPS[number]
	const randomGroup = (): Group =>
		ALL_GROUPS[Math.floor(Math.random() * ALL_GROUPS.length)]

	const group = randomGroup()

	switch (group) {
		case 'A':
			return <A />
		case 'B':
			return <B />
		default:
			return <Control />
	}

	/* DEFAULT, BEfORE SPLIT TEST */
	// return (
	// 	<>
	// 		<ins
	// 			className="adsbygoogle sb-1a"
	// 			data-ad-client="ca-pub-7702053427535735"
	// 			data-ad-slot="8582549443"
	// 			data-full-width-responsive="false"
	// 		></ins>
	// 		<AdsenseScript />
	// 	</>
	// )
}
