import { cn } from 'functions/helpers/classNames'
import { UpDownIcons } from './Blocks/UpDownIcons'
import { MiniChart } from './MiniChart'
import { useMiniChart } from './useMiniChart'

type Props = {
	title: string
	symbol: string
	type: 'stocks' | 'etf'
	range: '1D'
}

type MiniChartData = {
	previousClose: number | null
	color: 'red' | 'green'
	percentChange: string | null
	chart: number[]
}

type QueryProps = {
	data: MiniChartData
	isFetching: boolean
}

/**
 * Returns a sparkline chart for a given symbol
 */
export function MiniChartWidget({ title, symbol, type, range }: Props) {
	const { data, isFetching }: QueryProps = useMiniChart({ symbol, type, range })

	return (
		<div className="mcwidget">
			<div>
				<div className="mctitle">{title}</div>
				<div className={cn('mcupdown', data?.color)}>
					<UpDownIcons color={data?.color} />
					<div className="mcchange">{data?.percentChange}</div>
				</div>
			</div>
			<MiniChart
				previousClose={data?.previousClose}
				chart={data?.chart}
				color={data?.color}
				isFetching={isFetching}
			/>
		</div>
	)
}
