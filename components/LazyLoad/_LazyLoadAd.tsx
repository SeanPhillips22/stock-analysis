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

	// If intersection observer is not defined, then just show the ad
	// without lazy loading
	if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
		return (
			<>
				{checked && !isPro && !noAds(path) && (
					<div className={className}>{children}</div>
				)}
			</>
		)
	}

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
