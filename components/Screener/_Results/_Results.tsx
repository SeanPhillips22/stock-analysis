/* eslint-disable react/display-name */
import { CellNumber } from 'types/Tables'
import { ResultsTable } from './ResultsTable/_ResultsTable'
import { formatCells } from 'functions/tables/formatCells'
import { useScreenerContext } from '../ScreenerContext'
import { FilterProps, ScreenerTypes } from '../screener.types'
import { screenerState } from '../screener.state'

function formatHeader(text: string) {
	return <div className="ml-auto">{text}</div>
}

function formatColumns(type: ScreenerTypes, dataPoints: FilterProps[]) {
	// loop through the data points to configure the settings for each column
	const columns = dataPoints.map(column => {
		// If column has a "format" property, use it to format the value
		if (column.format) {
			let header
			let cell
			let sortInverted
			switch (column.format) {
				case 'linkSymbol': {
					header = column.columnName || column.name
					cell = (props: any) => formatCells('linkSymbol', props, type)
					sortInverted = false
					break
				}

				case 'string': {
					header = column.columnName || column.name
					cell = (props: any) => props.value || null
					sortInverted = false
					break
				}

				case 'abbreviate': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('abbreviate', props)
					break
				}

				case 'changePcColor': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('colorPercentage', props)
					break
				}

				case 'format2dec': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('format2dec', props, type)
					break
				}

				case 'format0dec': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('integer', props, type)
					break
				}

				case 'amount': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('format2dec', props, type)
					break
				}

				case 'align': {
					header = formatHeader(column.columnName || column.name)
					cell = function formatCells({ cell: { value } }: CellNumber) {
						return <div className="tr">{value || '-'}</div>
					}
					break
				}

				case 'percentage': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('formatPercentage', props)
					break
				}

				case 'date': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('formatDate', props)
					break
				}

				case 'marketcap': {
					header = formatHeader(column.columnName || column.name)
					cell = (props: any) => formatCells('abbreviate', props, 'stocks', 'mr-2')
					break
				}

				case 'padleft': {
					header = <div className="ml-1">{column.columnName || column.name}</div>
					cell = function FormatCell({ cell: { value } }: CellNumber) {
						return <div className="ml-1">{value}</div>
					}
					sortInverted = false
					break
				}

				case 'array': {
					header = formatHeader(column.columnName || column.name)
					cell = () => <div className="tr">Yes</div>
					break
				}

				default:
					header = column.columnName || column.name
					cell = (props: any) => props.value
					break
			}

			return {
				Header: header,
				accessor: column.id,
				name: column.columnName || column.name,
				Cell: cell,
				sortType: column.sortType || 'basic',
				sortInverted: sortInverted ?? true
			}
		}

		// If no format specified, just return plain Header/accessor pair
		return {
			Header: column.columnName || column.name,
			accessor: column.id
		}
	})

	return columns
}

export function Results() {
	const { type, state, dataPoints } = useScreenerContext()
	const resultsMenu = screenerState(state => state.resultsMenu)

	const columns = formatColumns(type, dataPoints)

	const displayColumns = columns.filter((column: any) => state.columns.all[resultsMenu].includes(column.accessor))

	return <ResultsTable cols={displayColumns} />
}
