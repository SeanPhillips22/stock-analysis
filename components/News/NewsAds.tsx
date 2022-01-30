import dynamic from 'next/dynamic'
const NewsAd1 = dynamic(() => import('components/Ads/Dianomi/NewsAd1'), {
	ssr: false
})
const NewsAd2 = dynamic(() => import('components/Ads/Dianomi/NewsAd2'), {
	ssr: false
})

import { LazyLoadAd } from 'components/LazyLoad/_LazyLoadAd'

export function NewsAds({ ad }: { ad: number }) {
	if (ad === 1) {
		return (
			<LazyLoadAd offset={300}>
				<div className="news-spns" id="ad-banner">
					<NewsAd1 />
				</div>
			</LazyLoadAd>
		)
	} else if (ad === 2) {
		return (
			<LazyLoadAd offset={400}>
				<div className="news-spns" id="ad-banner">
					<NewsAd2 />
				</div>
			</LazyLoadAd>
		)
	}

	return null
}
