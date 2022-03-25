import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'

type Props = {
	title: string
	lists: { name: string; url: string }[]
	classes?: string
}

export function RelatedStockLists({ title, lists, classes }: Props) {
	return (
		<div className={cn('tickers', classes ? classes : '')}>
			{`${title}: `}
			{lists.map(list => (
				<Link href={list.url} key={list.url} prefetch={false}>
					<a>{list.name}</a>
				</Link>
			))}
		</div>
	)
}
