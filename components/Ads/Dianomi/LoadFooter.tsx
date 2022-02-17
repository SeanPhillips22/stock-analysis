import dynamic from 'next/dynamic'
const FooterAd = dynamic(() => import('components/Ads/Dianomi/FooterAd'), {
	ssr: false
})
import { useLayoutContext } from 'components/Layout/LayoutContext'

export function LoadFooter() {
	const { url } = useLayoutContext()

	return <FooterAd key={url} />
}
