import { authState } from 'state/authState';
import { noAds } from 'components/Ads/noAds';
import { useNavState } from 'hooks/useNavState';

export function HeaderAd() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const { path } = useNavState();

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div className="hidden md:block bg-gray-100 pt-1 pb-2">
					<div className="md:min-h-[111px] md:max-w-[728px] mx-auto">
						<div id="adngin-top_leaderboard-0"></div>
					</div>
				</div>
			);
		}
	}

	return null;
}