import { LazyLoadAd } from 'components/LazyLoad/_LazyLoadAd'
import { LoadFooter } from 'components/Ads/Dianomi/LoadFooter'

export function DisplayFooterAd() {
	return (
		<aside>
			<LazyLoadAd
				offset={400}
				className="mx-auto max-w-[1200px] px-3 pb-4 xs:px-4 lg:px-6"
			>
				<LoadFooter />
			</LazyLoadAd>
		</aside>
	)
}
