import dynamic from 'next/dynamic'
const FooterAd = dynamic(() => import('components/Ads/Dianomi/FooterAd'), {
	ssr: false
})
const Footer1 = dynamic(() => import('components/Ads/AdSense/Footer1'), {
	ssr: false
})
import { useLayoutContext } from 'components/Layout/LayoutContext'

export function LoadFooter() {
	const { url } = useLayoutContext()

	let Ad = [FooterAd, Footer1][Math.floor(Math.random() * 2)]

	return <Ad key={url} />
}
