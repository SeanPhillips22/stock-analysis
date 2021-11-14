import { useAuth } from 'hooks/useAuth'
import { navState } from 'state/navState'
import { noAds } from 'components/Ads/noAds'

export function Mobile1() {
	const path = navState((state) => state.path)
	const { checked, isPro } = useAuth()

	if (!noAds(path.one)) {
		if (!checked || (checked && !isPro)) {
			return (
				<div
					id="ad-banner"
					className="mx-auto text-center overflow-x-auto sm:hidden"
				>
					<div
						id="adngin-in-content_1_mobile-0"
						className="block sm:hidden center-children"
					></div>
				</div>
			)
		}
	}

	return null
}
