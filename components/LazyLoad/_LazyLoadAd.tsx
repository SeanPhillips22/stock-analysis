import { useAuthState } from 'hooks/useAuthState'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { noAds } from 'components/Ads/noAds'
import { Observer } from 'components/LazyLoad/Observer'

type Props = {
	children: React.ReactNode
	offset: number
	className?: string
}

export function LazyLoadAd({ children, offset, className }: Props) {
	const { checked, isPro } = useAuthState()

	// Check the nav state
	const { path } = useLayoutContext()

	// Only load the observer if: a) not pro user and b) not on an excluded page
	return (
		<>
			{checked && !isPro && !noAds(path) && (
				<Observer offset={offset} className={className}>
					{children}
				</Observer>
			)}
		</>
	)
}
