import { screenerState } from 'components/StockScreener/screener.state'
import { DataId } from 'types/DataId'
import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { createLabelFromString } from 'components/StockScreener/functions/filterString/createLabelFromString'

type Props = {
	active: string | false
	id: DataId
}

export function FilterButton({ active, id }: Props) {
	const filters = screenerState(state => state.filters)
	const openFilter = screenerState(state => state.openFilter)
	const setOpenFilter = screenerState(state => state.setOpenFilter)

	function findName() {
		const filter = filters.find(filter => filter.id === id)
		const value = filter?.value

		if (
			value &&
			(filter?.filterType === 'numeric' ||
				filter?.filterType === 'date' ||
				filter?.filterType === 'numericRange')
		) {
			return createLabelFromString(value, filter)
		} else if (value && filter?.filterType === 'stringmatch') {
			return value
		}
		return false
	}

	function handleClick() {
		if (id === openFilter) {
			setOpenFilter('')
		} else {
			setOpenFilter(id)
		}
	}

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'Escape') setOpenFilter('')
		if (e.key === 'Enter') handleClick()
	}

	const buttonText = active ? findName() : 'Any'

	return (
		<div
			className={`inline-flex justify-between w-[125px] xs:w-[140px] sm:w-[125px] rounded border border-gray-200 shadow-sm px-3 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 cursor-pointer${
				active ? ' bg-yellow-100 px-2' : ''
			}`}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<span className="overflow-hidden overflow-ellipsis">{buttonText}</span>

			<ChevronDownIcon
				className="-mr-1 ml-2 h-5 w-5 pointer-events-none"
				aria-hidden="true"
			/>
		</div>
	)
}
