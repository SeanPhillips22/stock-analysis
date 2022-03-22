import { FilterOption, FilterProps } from 'components/Screener/screener.types'
import { useEffect, useState } from 'react'
import { PresetChoice } from './Choices/PresetChoice'

type Props = {
	filter: FilterProps
	active: string | false
}

export function StringFilter({ filter, active }: Props) {
	const [search, setSearch] = useState('')
	const [options, setOptions] = useState<FilterOption[]>(filter.options)
	const [count] = useState(filter.options.length)

	const filterType = filter.filterType

	useEffect(() => {
		if (filterType === 'stringmatch') {
			if (search.length > 0) {
				const filtered = filter.options.filter(option => option.name.toLowerCase().includes(search.toLowerCase()))
				setOptions(filtered)
			} else {
				setOptions(filter.options)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, filterType])

	useEffect(() => {
		if (filterType === 'stringmatch') {
			if (!active) {
				setSearch('')
				setOptions(filter.options)
			}
		}
	}, [active, filter.options, filterType])

	return (
		<div className="py-1">
			{count > 6 && filterType === 'stringmatch' && (
				<input
					type="text"
					className="w-full border-0 border-b border-gray-200 focus:border-gray-200 focus:ring-0"
					placeholder="Search..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			)}
			<div className="thin-scroll max-h-[300px] overflow-y-auto overflow-x-hidden overscroll-contain whitespace-nowrap lg:max-h-[400px]">
				{options &&
					options.map(option => (
						<PresetChoice key={option.value} option={option} filter={filter} active={active} />
					))}
			</div>
		</div>
	)
}
