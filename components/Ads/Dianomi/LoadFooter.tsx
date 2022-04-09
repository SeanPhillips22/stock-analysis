import dynamic from 'next/dynamic'
// const FooterAd = dynamic(() => import('components/Ads/Dianomi/FooterAd'), {
// 	ssr: false
// })
const FooterAd = dynamic(() => import('components/Ads/AdSense/FooterAd'), {
	ssr: false
})
const FooterAdBanner = dynamic(() => import('components/Ads/AdSense/FooterAdBanner'), {
	ssr: false
})
import { useLayoutContext } from 'components/Layout/LayoutContext'

export function LoadFooter() {
	const { url } = useLayoutContext()

	const rand = Math.random()

	if (rand < 0.5) {
		return <FooterAd key={url} />
	} else {
		return <FooterAdBanner key={url} />
	}

	// return <FooterAd key={url} />
}
