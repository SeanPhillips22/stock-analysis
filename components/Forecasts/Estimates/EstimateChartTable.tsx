import { capitalize } from 'functions/helpers/capitalize'
import { abbreviateNumber } from 'functions/numbers/abbreviateNumber'
import { format1dec, format2dec } from 'functions/tables/formatTableCell'
import { EstimateChartType, EstimatesCharts } from 'types/Forecast'

type Props = {
	title: string
	data: EstimatesCharts
	type: EstimateChartType
	lastActualDate: string
}

// Get the year from the date string
function getYear(date: string) {
	return date?.split('-')[0]
}

// To add colored cells to the table
function addColor(num: number) {
	let formatted = format1dec(num)
	if (num > 0) {
		return <div className="text-green-800">{formatted}%</div>
	} else if (num < 0) {
		return <div className="text-red-700">{formatted}%</div>
	} else {
		return formatted
	}
}

// Array to loop through when rendering the table
type arrType = 'high' | 'avg' | 'low'
const arr: arrType[] = ['high', 'avg', 'low']

export function EstimateChartTable({
	title,
	data,
	type,
	lastActualDate
}: Props) {
	const tableData = data[type]

	// Get the array of dates, excluding the last "actual" year if it's in the data
	let dates = Object.keys(tableData)
	dates = dates.filter(i => i !== lastActualDate)

	return (
		<div className="mt-3 overflow-x-auto p-0 text-center sm:p-0.5 lg:mt-3.5">
			<table
				className="w-full text-right text-tiny xs:text-sm md:text-small"
				id="ratings-table"
			>
				<thead>
					<tr className="border-b border-gray-200 align-bottom font-normal hover:bg-gray-50">
						<th className="p-1 text-left font-semibold">{title}</th>
						{dates.map((date: string) => (
							<th className="p-1 font-semibold" key={date} title={date}>
								{getYear(date)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{arr.map(i => {
						return (
							<tr
								className="border-b border-gray-200 last:border-0 hover:bg-gray-50"
								key={i}
							>
								<td className="whitespace-nowrap px-1 py-[3px] text-left">
									{capitalize(i)}
								</td>
								{dates.map((date: string) => {
									let d = tableData[date][i]

									let formatted: any
									if (type === 'revenue')
										formatted = abbreviateNumber(d, 1)
									else if (type.includes('Growth'))
										formatted = addColor(d)
									else formatted = format2dec(d)

									let title: any
									if (type === 'revenue')
										title = abbreviateNumber(d, 1)
									else if (type.includes('Growth'))
										title = format2dec(d) + '%'
									else title = format2dec(d)

									return (
										<td
											className="px-1 py-[3px]"
											title={title}
											key={date + i}
										>
											{formatted}
										</td>
									)
								})}
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
