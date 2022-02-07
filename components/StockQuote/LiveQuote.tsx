import { Info } from 'types/Info'
import { useQuote } from 'hooks/useQuote'
import { RegularQuote } from './Types/RegularQuote'
import { RegularExtended } from './Types/RegularExtended'
import { ExtendedQuote } from './Types/ExtendedQuote'

export function LiveQuote({ info }: { info: Info }) {
	const quote = useQuote(info)

	if (quote.e) {
		return (
			<div className="ext-wrap">
				<RegularExtended quote={quote} />
				<ExtendedQuote quote={quote} />
			</div>
		)
	}

	return (
		<div className="mb-5">
			<RegularQuote quote={quote} />
		</div>
	)
}
