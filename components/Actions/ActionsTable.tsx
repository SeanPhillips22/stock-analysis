/* eslint-disable no-unused-vars */
import {
	useTable,
	useGlobalFilter,
	useAsyncDebounce,
	Column,
	useFilters
} from 'react-table'
import { useState, useEffect, useMemo } from 'react'
import styles from './ActionsTable.module.css'
import { useAuthState } from 'hooks/useAuthState'
import { getActionsDataFull } from 'functions/apis/callBackEnd'
import { actionsState } from 'state/actionsState'
import { ActionsControls } from './ActionsControls'

type Props = {
	title: string
	columndata: Column<any>[]
	rowdata: any[]
	fullCount: number
	type: string
	year?: string
}

export function ActionsTable({
	title,
	columndata,
	rowdata,
	fullCount,
	type,
	year
}: Props) {
	const [dataRows, setDataRows] = useState(rowdata)
	const filter = actionsState(state => state.filter)
	const setParamFilter = actionsState(state => state.setFilter)
	const { isPro } = useAuthState()

	const count = rowdata.length

	// If pro user and data is limited, fetch the full data
	useEffect(() => {
		async function fetchFullActions() {
			const res = await getActionsDataFull(type, year)
			if (res.data && res.data.length > count) {
				setDataRows(res.data)
				if (filter) {
					setParamFilter(filter)
					setGlobalFilter(filter)
				}
			} else {
				throw new Error(
					'Unable to fetch full data, response was invalid or empty array'
				)
			}
		}
		if (isPro && fullCount > count) {
			fetchFullActions()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fullCount, isPro, count, year, type])

	const columns = useMemo(() => columndata, [columndata])
	const data = useMemo(() => dataRows, [dataRows])

	const { headerGroups, prepareRow, rows, setGlobalFilter, setFilter } =
		useTable(
			{
				columns,
				data
			},
			useFilters,
			useGlobalFilter
		)

	const setDualFilter = (filterValue: string) => {
		setGlobalFilter(filterValue)
		setParamFilter(filterValue)
	}

	return (
		<>
			<ActionsControls
				title={title}
				useAsyncDebounce={useAsyncDebounce}
				globalFilter={filter}
				setGlobalFilter={setDualFilter}
				setColumnFilter={type == 'splits' ? setFilter : undefined}
				tableId="actions-table"
			/>
			<div className={`overflow-x-auto ${styles[type]}`}>
				<table className={styles.actionstable} id="actions-table">
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
