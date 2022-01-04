import { useTransitionState } from './useTransitionState'
import { useAdSlot } from './useAdSlot'
import { Ads_Map } from './ads'

type Props = {
	adId: string
}

export default function TestAd({ adId }: Props) {
	const { isTransitioning } = useTransitionState()
	const ad = Ads_Map[adId]

	useAdSlot({
		mapping: ad.mapping,
		sizes: ad.sizes,
		id: adId,
		isTransitioning
	})

	return <div id={`div-gpt-ad-${adId}`} />
}
