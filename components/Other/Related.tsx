import { RelatedStockLists } from './RelatedStockLists'
import { RelatedSymbols } from './RelatedSymbols'

type Props = {
	etfs?: string[]
	lists?: { name: string; url: string }[]
}

export function Related({ etfs, lists }: Props) {
	return (
		<div className="relative mt-4 mb-5 rounded border border-gray-300 p-4 pb-3">
			<div className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-sm font-semibold text-gray-900">
				Related
			</div>
			<div className="space-y-2 md:flex md:flex-wrap md:justify-between md:space-y-0">
				{lists && <RelatedStockLists title="Categories" lists={lists} classes="block font-semibold" />}
				{etfs && <RelatedSymbols title="ETFs" symbols={etfs} classes="block font-semibold" />}
			</div>
		</div>
	)
}
