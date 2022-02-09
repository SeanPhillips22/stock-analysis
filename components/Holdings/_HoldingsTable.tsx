import { Holding } from 'types/Holdings'
import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	Column
} from 'react-table'
import { useState, useEffect, useMemo } from 'react'
import { StockLink, ETFLink } from 'components/Links'
import { useAuthState } from 'hooks/useAuthState'
import { getPageDataFull } from 'functions/apis/callBackEnd'
import { Controls } from 'components/Controls/_Controls'
import { CellString } from 'types/Tables'

interface Props {
	symbol: string
	rawdata: Holding[]
	fullCount: number
}

export const HoldingsTable = ({ symbol, rawdata, fullCount }: Props) => {
	const [dataRows, setdataRows] = useState(rawdata)
	const { isPro } = useAuthState()

	const count = rawdata.length

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullHoldings() {
			const res = await getPageDataFull('holdings', symbol)

			if (res && res.data.list && res.data.list.length > count) {
				setdataRows(res.data.list)
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				)
			}
		}

		if (isPro && fullCount > count) {
			fetchFullHoldings()
		}
	}, [count, fullCount, isPro, symbol])

	const columns: Column[] = useMemo(
		() => [
			{
				Header: 'No.',
				accessor: 'no'
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				Cell: function FormatCell({ cell: { value } }: CellString) {
					if (value.startsWith('$')) {
						return <StockLink symbol={value.slice(1)} />
					} else if (value.startsWith('#')) {
						return <ETFLink symbol={value.slice(1)} />
					}
					return value
				}
			},
			{
				Header: 'Company Name',
				accessor: 'name'
			},
			{
				Header: '% Assets',
				accessor: 'assets'
			},
			{
				Header: 'Shares',
				accessor: 'shares'
			}
		],
		[]
	)

	const data = useMemo(() => dataRows, [dataRows])

	const {
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		state: { globalFilter }
	} = useTable(
		{
			columns,
			data
		},
		useGlobalFilter
	)

	return (
		<>
			<Controls
				count={fullCount}
				title="Holdings"
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={globalFilter}
				setGlobalFilter={setGlobalFilter}
				tableId="holdings-table"
			/>
			<div className="overflow-x-auto">
				<table className="symbol-table holdings" id="holdings-table">
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index}>
								{headerGroup.headers.map((column, index) => (
									<th key={index}>{column.render('Header')}</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{rows.map((row, index) => {
							prepareRow(row)
							return (
								<tr key={index}>
									{row.cells.map((cell, index) => {
										return <td key={index}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</>
	)
}
