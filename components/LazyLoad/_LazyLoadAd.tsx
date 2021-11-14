import { useAuth } from 'hooks/useAuth'
import { navState } from 'state/navState'
import { noAds } from 'components/Ads/noAds'
import { Observer } from 'components/LazyLoad/Observer'

type Props = {
	children: React.ReactNode
	offset: number
}

export function LazyLoadAd({ children, offset }: Props) {
	const { checked, isPro } = useAuth()

	// Check the nav state
	const path = navState((state) => state.path)

	// Only load the observer if: a) not pro user and b) not on an excluded page
	return (
		<>
			{checked && !isPro && !noAds(path.one) && (
				<Observer offset={offset}>{children}</Observer>
			)}
		</>
	)
}
