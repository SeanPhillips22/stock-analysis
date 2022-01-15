import { screenerState } from 'components/StockScreener/screener.state'
import { CellNumber } from 'types/Tables'
import { abbreviate } from 'components/StockScreener/functions/abbreviate'
import { ResultsTable } from './ResultsTable'
import { COLUMNS_MAP } from 'components/StockScreener/maps/allColumns.map'
import { formatCell } from 'functions/tables/tableFormat'

const format2dec = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

function formatHeader(text: string) {
	return <div className="ml-auto">{text}</div>
}

function formatColumns() {
	const columns = COLUMNS_MAP.map(column => {
		const type = screenerState(state => state.type)

		// If column has a "format" property, use it to format the value
		if (column.format) {
			let header
			let cell
			let sortInverted
			switch (column.format) {
				case 'linkSymbol': {
					header = column.Header
					cell = (props: any) => formatCell('linkSymbol', props, type)
					sortInverted = false
					break
				}

				case 'string': {
					header = column.Header
					cell = (props: any) => props.value || null
					sortInverted = false
					break
				}

				case 'abbreviate': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('abbreviate', props)
					break
				}

				case 'changePcColor': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('colorPercentage', props)
					break
				}

				case 'format2dec': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('format2dec', props, type)
					break
				}

				case 'format0dec': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('integer', props, type)
					break
				}

				case 'amount': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('format2dec', props, type)
					break
				}

				case 'align': {
					header = formatHeader(column.Header)
					cell = function FormatCell({ cell: { value } }: CellNumber) {
						return <div className="text-right">{value}</div>
					}
					break
				}

				case 'percentage': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('formatPercentage', props)
					break
				}

				case 'date': {
					header = formatHeader(column.Header)
					cell = (props: any) => formatCell('formatDate', props)
					break
				}

				case 'marketcap': {
					header = <div className="ml-auto">{column.Header}</div>
					cell = function FormatCell({ cell: { value } }: CellNumber) {
						return (
							<div className="text-right mr-3">
								{abbreviate(value, format2dec)}
							</div>
						)
					}

					break
				}

				case 'padleft': {
					header = <div className="ml-1">{column.Header}</div>
					cell = function FormatCell({ cell: { value } }: CellNumber) {
						return <div className="ml-1">{value}</div>
					}
					sortInverted = false
					break
				}

				default:
					header = column.Header
					cell = (props: any) => props.value
					break
			}

			return {
				Header: header,
				accessor: column.accessor,
				name: column.Header,
				Cell: cell,
				sortType: column.sortType || 'basic',
				sortInverted: sortInverted ?? true
			}
		}

		// If no format specified, just return plain Header/accessor pair
		return {
			Header: column.Header,
			accessor: column.accessor
		}
	})

	return columns
}

export function ResultsBody() {
	const showColumns = screenerState(state => state.showColumns)

	const columns = formatColumns()

	const displayColumns = columns.filter((column: any) =>
		showColumns.includes(column.accessor)
	)

	return <ResultsTable cols={displayColumns} />
}
