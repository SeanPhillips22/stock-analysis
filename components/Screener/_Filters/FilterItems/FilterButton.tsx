import { screenerState } from 'components/Screener/screener.state'
import { DataId } from 'types/DataId'
import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { createLabelFromString } from 'components/Screener/functions/filterString/createLabelFromString'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { cn } from 'functions/helpers/classNames'

type Props = {
	active: string | false
	id: DataId
}

export function FilterButton({ active, id }: Props) {
	const { state } = useScreenerContext()
	const openFilter = screenerState(state => state.openFilter)
	const setOpenFilter = screenerState(state => state.setOpenFilter)

	function findName() {
		const filter = state.filters.find(filter => filter.id === id)
		const { value, array, filterType } = filter || {}

		if (value && filterType && ['numeric', 'date', 'numericRange'].includes(filterType)) {
			return createLabelFromString(value, filter)
		} else if (value && filterType && ['stringmatch', 'arraymatch'].includes(filterType)) {
			return value
		} else if (array && filterType === 'multiselect') {
			return array.join(', ')
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
			className={cn(
				'inline-flex w-[125px] cursor-pointer justify-between whitespace-nowrap rounded border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 xs:w-[140px] sm:w-[125px]',
				active ? ' bg-yellow-100 px-2' : ''
			)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			tabIndex={0}
		>
			<span className="overflow-hidden text-ellipsis">{buttonText}</span>

			<ChevronDownIcon className="pointer-events-none -mr-1 ml-2 h-5 w-5" aria-hidden="true" />
		</div>
	)
}
