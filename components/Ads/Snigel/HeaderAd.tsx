import { useAuthState } from 'hooks/useAuthState'
import { noAds } from 'components/Ads/noAds'
import { useNavState } from 'hooks/useNavState'

export function HeaderAd() {
	const { isLoggedIn } = useAuthState()
	const { path } = useNavState()

	if (!noAds(path.one)) {
		if (!isLoggedIn) {
			return (
				<aside id="ad-banner">
					<div className="pt-1 -mb-1.5 md:-mb-2.5 mx-auto text-center header-ad">
						<div
							className="min-h-[65px] md:min-h-[103px] md:max-w-[728px] lg:max-w-[970px] mx-auto text-center center-children overflow-x-auto"
							id="adngin-top_leaderboard-0"
						></div>
					</div>
				</aside>
			)
		}
	}

	return null
}
