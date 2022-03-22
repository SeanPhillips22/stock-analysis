import { useQuote } from 'hooks/useQuote'
import { Info } from 'types/Info'

type ChartDataType = {
	t: string
	c: number
	o?: number
}

type Props = {
	chartData: ChartDataType[]
	chartTime: string
	info: Info
	show: boolean
}

export const PriceChange = ({ chartData, chartTime, info, show }: Props) => {
	const quote = useQuote(info)

	let raw: number | null
	let formatted: string
	let dec = 2

	if (typeof window !== 'undefined' && window.screen.width < 370) {
		dec = 1
	}

	if (chartTime === '1D') {
		raw = Number(quote.c)
		formatted = raw > 0 ? '+' + quote.cp + '%' : quote.cp + '%'
	} else {
		const first = chartData[0].o
		const last = quote.ep || quote.p

		raw = first ? (last / first - 1) * 100 : null

		formatted = raw ? (raw > 0 ? '+' + raw.toFixed(dec) + '%' : raw.toFixed(dec) + '%') : 'n/a'
	}

	const css = raw ? (raw > 0 ? 'text-green-700' : raw < 0 ? 'text-red-600' : 'text-gray-600') : 'text-gray-600'

	// Don't show while chart is loading
	if (!show) return null

	return (
		<div className="flex flex-row space-x-1 pr-1 text-smaller sm:text-base">
			<span className={css}>{formatted}</span>
			<span className="hidden text-gray-700 sm:block">({chartTime})</span>
		</div>
	)
}
