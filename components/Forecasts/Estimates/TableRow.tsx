/* eslint-disable react/display-name */
import { TooltipChart } from 'components/FinancialTable/TooltipChart'
import { HoverChartIcon } from 'components/Icons/HoverChart'
import { forwardRef } from 'react'
import { EstimatesTableKeys } from 'types/Forecast'
import { EstimatesHoverChart } from './EstimatesHoverChart'

const ChartIcon = forwardRef<HTMLDivElement>((props, ref) => (
	<div ref={ref}>
		<HoverChartIcon />
	</div>
))

type Props = {
	title: string
	styles: string
	range: 'Annual' | 'Quarterly'
	id: EstimatesTableKeys
}

export function TableRowTitle({ title, styles, range, id }: Props) {
	return (
		<td>
			<span>{title}</span>
			<TooltipChart
				render={attrs => (
					<div
						className="whitebg z-20 h-[40vh] w-[96vw] border border-gray-200 bg-white p-2 md:h-[330px] md:w-[600px] md:py-2 md:px-3"
						tabIndex={-1}
						{...attrs}
					>
						<EstimatesHoverChart id={id} range={range} title={title} />
					</div>
				)}
				delay={200}
				interactive={true}
				offset={[150, -1]}
				popperOptions={{
					modifiers: [{ name: 'flip', enabled: false }]
				}}
				trigger="mouseenter focus click"
				zIndex={30}
			>
				<div className={styles}>
					<ChartIcon />
				</div>
			</TooltipChart>
		</td>
	)
}
