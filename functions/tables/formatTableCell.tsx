import { ScreenerTypes } from 'components/StockScreener/screener.types'
import Link from 'next/link'
import { FormatFunction } from 'types/Tables'

type Fn = FormatFunction
type Type = ScreenerTypes

const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

const dec2 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

const dec3 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 3
})

function format(value: number, decimals: 0 | 2 | 3) {
	if (!value) return '-'
	if (decimals === 0) return dec0.format(value)
	if (decimals === 2) return dec2.format(value)
	if (decimals === 3) return dec3.format(value)
	return value
}

// Inline formatting inside the table loop
export function formatTableCell(
	fn: Fn | undefined,
	value: string | number,
	type: Type = 'stocks'
) {
	if (!fn) return value
	if (fn === 'linkSymbol') return formatSymbol(value as string, type)
	if (fn === 'format2dec') return format2dec(value as number)
	if (fn === 'price') return formatPrice(value as number)
	if (fn === 'integer') return formatInteger(value as number)
	if (fn === 'formatPercentage') return formatPercentage(value as number)
	if (fn === 'colorPercentage') return colorPercentage(value as number)
	if (fn === 'abbreviate') return abbreviate(value as number)
	if (fn === 'formatDate') return formatDate(value as string)
	if (fn === 'string') return formatString(value as string)
	return null
}

// Turn a symbol into a link to the overview page
export function formatSymbol(value: string, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	if (value.startsWith('=')) return value.slice(1)
	let symbol = value.includes('.') ? value : `${value}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
		<Link href={url} prefetch={false}>
			<a>{value}</a>
		</Link>
	)
}

// Format a number with comma and 2 decimal points
export function format2dec(value: number) {
	return format(value, 2)
}

// Format a number with comma and 2 decimal points
export function formatPrice(value: number) {
	if (!value) return '-'
	let formatted = '$' + format(value, 2)
	return <div data-raw={value}>{formatted}</div>
}

// Format an integer with comma and 0 decimal points
export function formatInteger(value: number) {
	let formatted = format(value, 0)
	return <div data-raw={value}>{formatted}</div>
}

// Format a percentage with comma and 2 decimal points
export function formatPercentage(value: number) {
	if (!value) return '-'
	let formatted = format(value, 2) + '%'
	return formatted
}

// Format percentage growth, with color
export function colorPercentage(value: number) {
	if (!value) return '-'
	let raw = (value / 100 + 1).toFixed(3)
	let formatted = format(value, 2) + '%'

	if (value > 0)
		return (
			<div data-raw={raw} className="rg">
				{formatted}
			</div>
		)
	if (value < 0)
		return (
			<div data-raw={raw} className="rr">
				{formatted}
			</div>
		)
	return (
		<div data-raw={raw} className="rgr">
			{formatted}
		</div>
	)
}

// Abbreviate a number with B/M/K
export function abbreviate(value: number) {
	if (!value)
		return (
			<div data-raw="n/a" className="tr">
				-
			</div>
		)

	let num = '-'
	if (value >= 1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value >= 1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value > 1000) num = dec2.format(value / 1000) + 'K'
	else if (value <= -1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value <= -1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value <= -1000) num = dec2.format(value / 1000) + 'K'
	else num = dec2.format(value)

	return (
		<div data-raw={value} className="tr">
			{num}
		</div>
	)
}

// Format a date
export function formatDate(value: string) {
	if (!value) return '-'

	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	]

	const dt = new Date(value)
	return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
}

// Format a string
export function formatString(value: string) {
	return value || '-'
}
