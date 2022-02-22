import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Features } from './Features'

export function Sidebar({ url }: { url: string }) {
	return (
		<>
			<Sidebar1 key={url} />
			<Features />
		</>
	)
}
