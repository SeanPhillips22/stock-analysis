import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'

type Props = {
	lists: { name: string; url: string }[]
	classes?: string
}

export function RelatedStockLists({ lists, classes }: Props) {
	return (
		<div className="relative mt-5 mb-5 rounded border border-gray-300 px-1 pt-4 pb-3">
			<div className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-semibold text-gray-900">
				Related Categories
			</div>

			<div className={cn('tickers', classes ? classes : '')}>
				{lists.map(list => (
					<Link href={list.url} key={list.url} prefetch={false}>
						<a>{list.name}</a>
					</Link>
				))}
			</div>
		</div>
	)
}
