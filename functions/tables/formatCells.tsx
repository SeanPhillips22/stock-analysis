import { ScreenerTypes } from 'components/StockScreener/screener.types'
import Link from 'next/link'
import { CellNumber, CellString, FormatFunction } from 'types/Tables'

type Fn = FormatFunction
type Cell = CellNumber | CellString
type Type = ScreenerTypes

const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

const dec2 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

function format(value: number, decimals: 0 | 2) {
	if (!value) return '-'
	return decimals === 0 ? dec0.format(value) : dec2.format(value)
}

export function formatHeader(fn: Fn, value: string) {
	if (value === 'Price') return <div className="text-right">{value}</div>
	return value
}

export function formatCells(fn: Fn, cell: Cell, type: Type = 'stocks') {
	if (fn === 'linkSymbol') return formatSymbol(cell as CellString, type)
	if (fn === 'linkName') return formatName(cell as CellString, type)
	if (fn === 'format2dec') return format2dec(cell as CellNumber)
	if (fn === 'integer') return formatInteger(cell as CellNumber)
	if (fn === 'formatPercentage') return formatPercentage(cell as CellNumber)
	if (fn === 'colorPercentage') return colorPercentage(cell as CellNumber)
	if (fn === 'abbreviate') return abbreviate(cell as CellNumber)
	if (fn === 'formatDate') return formatDate(cell as CellString)
	if (fn === 'string') return formatString(cell as CellString)
	return null
}

// Turn a symbol into a link to the overview page
export function formatSymbol(cell: CellString, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let { value } = cell.cell
	let symbol = value.includes('.') ? value : `${value}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
		<Link href={url} prefetch={false}>
			<a>{value}</a>
		</Link>
	)
}

// Turn a symbol into a link to the overview page
export function formatName(cell: any, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let { value } = cell.cell
	let ticker = cell.row.values.s
	let symbol = ticker.includes('.') ? ticker : `${ticker}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
		<div className="string-left">
			<Link href={url} prefetch={false}>
				<a>{value}</a>
			</Link>
		</div>
	)
}

// Format a number with comma and 2 decimal points
export function format2dec(cell: CellNumber) {
	let { value } = cell.cell
	return <div className="text-right">{format(value, 2)}</div>
}

// Format an integer with comma and 0 decimal points
export function formatInteger(cell: CellNumber) {
	let { value } = cell.cell
	return <div className="text-right">{format(value, 0)}</div>
}

// Format a percentage with comma and 2 decimal points
export function formatPercentage(cell: CellNumber) {
	let { value } = cell.cell
	if (!value) return <div className="text-right">-</div>
	let formatted = format(value, 2) + '%'
	return <div className="text-right">{formatted}</div>
}

// Format percentage growth, with color
export function colorPercentage(cell: CellNumber) {
	let { value } = cell.cell

	if (!value) return <div className="text-right">-</div>

	let formatted = format(value, 2) + '%'

	if (value > 0) return <div className="right-green">{formatted}</div>
	if (value < 0) return <div className="right-red">{formatted}</div>
	return <div className="right-gray">{formatted}</div>
}

// Abbreviate a number with B/M/K
export function abbreviate(cell: CellNumber) {
	let { value } = cell.cell

	let num = '-'
	if (value >= 1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value >= 1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value > 1000) num = dec2.format(value / 1000) + 'K'
	else if (value <= -1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value <= -1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value <= -1000) num = dec2.format(value / 1000) + 'K'
	else num = dec2.format(value)

	return <div className="text-right">{num}</div>
}

// Format a date
export function formatDate(cell: CellString) {
	let { value } = cell.cell
	if (!value) return <div className="text-right">-</div>

	const datetime = new Date(value)
	const date = datetime.toLocaleString('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'short'
	})

	return <div className="text-right">{date}</div>
}

// Format a string
export function formatString(cell: CellString) {
	let { value } = cell.cell
	return <div className="string-left">{value || '-'}</div>
}
