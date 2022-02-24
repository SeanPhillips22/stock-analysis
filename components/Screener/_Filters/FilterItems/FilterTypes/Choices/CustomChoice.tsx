import { screenerState } from 'components/Screener/screener.state'
import { SelectComparison } from './Blocks/SelectComparison'
import { isFilterSelected } from 'components/Screener/functions/isFilterSelected'
import {
	ComparisonOption,
	FilterProps
} from 'components/Screener/screener.types'
import { useEffect, useState } from 'react'
import { getFilterFromString } from 'components/Screener/functions/filterString/getFilterFromString'
import { createFilterString } from 'components/Screener/functions/filterString/createFilterString'
import { useModifyFilters } from 'components/Screener/functions/useModifyFilters'
import { incrementFilter } from 'components/Screener/functions/filterString/incrementFilter'
import { decrementFilter } from 'components/Screener/functions/filterString/decrementFilter'
import { Increment } from './Blocks/Increment'

/**
 * Screener component that renders the custom filter where it is possible to select your own comparison. Over/Under/Between plus values.
 * @param {FilterProps} filter the properties of the individual filter
 * @return {JSX.Element}
 */
export function CustomChoice({ filter }: { filter: FilterProps }): JSX.Element {
	const { id, name, filterType, numberType } = filter
	const [compare, setCompare] = useState<ComparisonOption>('over')
	const [first, setFirst] = useState<string>('')
	const [second, setSecond] = useState<string>('')
	const [active, setActive] = useState<string | false>()
	const filters = screenerState(state => state.filters)
	const openFilter = screenerState(state => state.openFilter)
	const setOpenFilter = screenerState(state => state.setOpenFilter)
	const { add } = useModifyFilters()

	// Extract the filter values in order to populate the custom choice inputs
	useEffect(() => {
		setActive(isFilterSelected(id, filters))

		if (active && openFilter === id) {
			const filterObject = getFilterFromString(active, false)

			setCompare(filterObject.compare)
			setFirst(filterObject.first?.replace('X', '-'))
			setSecond(filterObject.second?.replace('X', '-'))

			if (filterObject.compare === 'notzero') {
				setFirst('')
			}
			if (filterObject.compare !== 'between' && filterObject.second !== '') {
				setSecond('')
			}
		} else {
			setCompare('over')
			setFirst('')
			setSecond('')
		}
	}, [filters, active, id, openFilter])

	// Update the filter if the values in the custom choice inputs change
	useEffect(() => {
		// If the values are valid, create a new filter string and update the filter
		if (first || second || compare === 'notzero') {
			const filterString = createFilterString({ compare, first, second })

			if (filterString !== active) {
				setActive(filterString)
				add(id, name, filterString, filterType, numberType)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compare, first, second])

	const firstValue = numberType === 'percentage' ? `${first}%` : first
	const secondValue = numberType === 'percentage' ? `${second}%` : second

	function handleKeyDown(e: React.KeyboardEvent, input: string) {
		if (e.key === 'Enter') setOpenFilter('')
		if (e.key === 'Escape') setOpenFilter('')
		if (e.key === 'ArrowUp') {
			if (input === 'first') setFirst(incrementFilter(first))
			if (input === 'second') setSecond(incrementFilter(second))
		}
		if (e.key === 'ArrowDown') {
			if (input === 'first') setFirst(decrementFilter(first))
			if (input === 'second') setSecond(decrementFilter(second))
		}
	}

	return (
		<div className="select-none space-y-1 p-1 pb-2 pr-2 text-sm ">
			<div className="flex items-center justify-start space-x-1">
				<div>
					<SelectComparison compare={compare} setCompare={setCompare} />
				</div>
				<div className={compare !== 'notzero' ? 'flex' : 'hidden'}>
					<input
						type="text"
						placeholder="Value"
						value={first}
						onChange={e => setFirst(e.target.value)}
						onKeyDown={e => handleKeyDown(e, 'first')}
						tabIndex={0}
						className="block max-w-[4rem] rounded-sm border-gray-300 p-1 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
					/>
					{/* Add two icons that increase and decrease the input value */}
					{compare !== 'notzero' && compare !== 'between' && (
						<Increment first={first} setFirst={setFirst} />
					)}
				</div>
				<div className={compare === 'between' ? 'block' : 'hidden'}>&</div>
				<input
					type="text"
					placeholder="Value"
					value={second}
					onChange={e => setSecond(e.target.value)}
					onKeyDown={e => handleKeyDown(e, 'second')}
					tabIndex={0}
					className={`block rounded-sm border-gray-300 p-1 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 max-w-[4rem]${
						compare === 'between' ? ' block' : ' hidden'
					}`}
				/>
			</div>
			{(first || second) && (
				<div className="ml-2 whitespace-normal text-gray-600">{`"${name} is ${compare} ${
					first ? firstValue : '...'
				}${
					second && compare === 'between' ? ` and ${secondValue}` : ''
				}"`}</div>
			)}
		</div>
	)
}
