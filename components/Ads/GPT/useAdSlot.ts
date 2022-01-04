import { useEffect } from 'react'

type Props = {
	mapping: any
	sizes: any
	id: string
	isTransitioning: boolean
}

export function useAdSlot({ mapping, sizes, id, isTransitioning }: Props) {
	useEffect(() => {
		if (!isTransitioning && typeof window !== undefined) {
			const { googletag } = window
			googletag.cmd.push(function () {
				const adMapping = googletag.sizeMapping()
				Object.keys(mapping).forEach((breakpoint) => {
					adMapping.addSize([Number(breakpoint), 0], mapping[breakpoint])
				})
				const builtMapping = adMapping.build()

				googletag
					.defineSlot(
						`/21976450666/Sidebar_Vertical_Bottom_300x600`,
						sizes,
						`div-gpt-ad-${id}`
					)
					.defineSizeMapping(builtMapping)
					.addService(googletag.pubads())
				googletag.enableServices()
			})

			googletag.cmd.push(function () {
				googletag.display(`div-gpt-ad-${id}`)
			})
		}
	}, [mapping, sizes, id, isTransitioning])
}
