// import { memo } from 'react'

import { InfoIcon } from 'components/Icons/Info'
import { memo, ReactNode } from 'react'
import { Tooltip } from './Tooltip'

type Props = {
	text: string
	children: ReactNode
}

/**
 * Wraps an item with a tooltip component. Adds an "i" next to the item
 * which toggles the tooltip text added inside the "text" prop
 */
export function WithTooltipComponent({ text, children }: Props) {
	return (
		<span className="relative">
			{children}
			<Tooltip content={<div className="p-1 text-smaller">{text}</div>} theme="light" delay={200}>
				<span className="def-icon">
					<InfoIcon classes="w-2 h-2" />
				</span>
			</Tooltip>
		</span>
	)
}

export const WithTooltip = memo(WithTooltipComponent)
