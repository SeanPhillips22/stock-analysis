import { useAuthState } from 'hooks/useAuthState'
import { noAds } from 'components/Ads/noAds'
import { useNavState } from 'hooks/useNavState'

export function HeaderAd() {
	const { checked, isPro } = useAuthState()
	const { path } = useNavState()

	if (!noAds(path.one) && path.one !== null) {
		if (!checked || (checked && !isPro)) {
			return (
				<div id="ad-banner">
					<div className="bg-gray-100 pt-1 pb-1 md:pb-2 mx-auto text-center">
						<div
							className="min-h-[70px] md:min-h-[111px] md:max-w-[728px] lg:max-w-[970px] mx-auto text-center center-children overflow-x-auto"
							id="adngin-top_leaderboard-0"
						></div>
					</div>
				</div>
			)
		}
	}

	return null
}
