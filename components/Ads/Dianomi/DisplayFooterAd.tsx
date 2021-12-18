import { LazyLoadAd } from 'components/LazyLoad/_LazyLoadAd'
import { LoadFooter } from 'components/Ads/Dianomi/LoadFooter'

export function DisplayFooterAd() {
	return (
		<aside>
			<LazyLoadAd offset={400}>
				<LoadFooter />
			</LazyLoadAd>
		</aside>
	)
}
