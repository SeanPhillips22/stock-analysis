import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ChevronUpIcon } from 'components/Icons/ChevronUpIcon'
import { decrementFilter } from 'components/Screener/functions/filterString/decrementFilter'
import { incrementFilter } from 'components/Screener/functions/filterString/incrementFilter'

type Props = {
	first: string
	setFirst: (first: string) => void
}

export function Increment({ first, setFirst }: Props) {
	return (
		<div>
			<div className="ml-1 flex flex-col items-center space-y-0">
				<span title="Increase by 1" onClick={() => setFirst(incrementFilter(first))}>
					<ChevronUpIcon
						className="h-4 w-4 cursor-pointer text-gray-500 hover:text-black"
						style={{ maxWidth: '40px' }}
					/>
				</span>
				<span title="Decrease by 1" onClick={() => setFirst(decrementFilter(first))}>
					<ChevronDownIcon
						className="h-4 w-4 cursor-pointer text-gray-500 hover:text-black"
						style={{ maxWidth: '40px' }}
					/>
				</span>
			</div>
		</div>
	)
}
