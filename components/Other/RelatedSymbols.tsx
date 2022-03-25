import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'

type Props = {
	title: string
	symbols: string[]
	classes?: string
}

export function RelatedSymbols({ title, symbols, classes }: Props) {
	return (
		<div className={cn('tickers', classes ? classes : '')}>
			{`${title}: `}
			{symbols.map(symbol => (
				<Link href={`/etf/${symbol.toLowerCase()}/`} key={symbol} prefetch={false}>
					<a>{symbol}</a>
				</Link>
			))}
		</div>
	)
}
