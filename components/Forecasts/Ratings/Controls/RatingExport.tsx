import { Export } from 'components/Controls/Export'
import { useSymbolContext } from 'components/Layout/SymbolContext'
import { useEffect, useState } from 'react'
import { authState } from 'state/authState'
import { ForecastData, Recommendations } from 'types/Forecast'

export function RatingExport({ data }: { data: ForecastData }) {
	const { info } = useSymbolContext()
	const isPro = authState(state => state.isPro)
	const [exportData, setExportData] = useState<any[]>(data.recommendations)

	useEffect(() => {
		if (isPro) {
			setExportData(rewrite(data.recommendations))
		}
	}, [data.recommendations, isPro])

	return (
		<Export
			tableId="ratings-table"
			data={exportData}
			fileName={`${info.symbol}-analyst-ratings`}
		/>
	)
}

function rewrite(data: Recommendations) {
	let newData = []
	newData[0] = [
		'Date',
		'Consensus',
		'Strong Sell',
		'Sell',
		'Hold',
		'Buy',
		'Strong Buy',
		'Total'
	]
	data.forEach((item: { [x: string]: any }) => {
		newData.push([
			item.month,
			item.consensus,
			item.strongSell,
			item.sell,
			item.hold,
			item.buy,
			item.strongBuy,
			item.total
		])
	})

	return newData
}
