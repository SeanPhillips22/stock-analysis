import { ScreenerTypes } from 'components/StockScreener/screener.types'
import Link from 'next/link'
import { CellNumber, CellString, FormatFunction } from 'types/Tables'

type Fn = FormatFunction
type Cell = CellNumber | CellString
type Type = ScreenerTypes

export function formatCell(fn: Fn, cell: Cell, type: Type) {
	if (fn === 'linkSymbol') return formatSymbol(cell as CellString, type)
	return null
}

export function formatSymbol(cell: CellString, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let { value } = cell.cell
	const symb = value.includes('.') ? value : `${value}/`

	return (
		<Link href={`/${urlPath}/${symb.toLowerCase()}`} prefetch={false}>
			<a>{value}</a>
		</Link>
	)
}
