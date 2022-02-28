import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { Features } from './Features'

type Props = {
	url: string
	list?: string[]
}

export function Sidebar({ url, list }: Props) {
	return (
		<>
			<Sidebar1 key={url} />
			<Features list={list} />
		</>
	)
}
