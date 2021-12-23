import { useAuthState } from 'hooks/useAuthState'
import { navState } from 'state/navState'
import { noAds } from 'components/Ads/noAds'

export function Sidebar1() {
	const path = navState((state) => state.path)

	const { checked, isPro } = useAuthState()

	if (!noAds(path.one)) {
		if (!checked || (checked && !isPro)) {
			return (
				<div id="ad-banner" className="mx-auto text-center hidden lg:block">
					<div
						id="adngin-sidebar_1-0"
						className="hidden lg:block lg:min-h-[263px] mx-auto center-children"
					></div>
				</div>
			)
		}
	}

	return null
}
