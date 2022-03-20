import { FilterOption, FilterProps, VariableFilter } from 'components/Screener/screener.types'
import { getData } from 'functions/apis/API'
import { useEffect, useState } from 'react'
import { PresetChoice } from './Choices/PresetChoice'
import { screenerState } from 'components/Screener/screener.state'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	filter: FilterProps
	active: string | false
}

export function StringFilter({ filter, active }: Props) {
	const { endpoint } = useScreenerContext()
	const variableFilters = screenerState(state => state.variableFilters)
	const addVariableFilter = screenerState(state => state.addVariableFilter)
	const [search, setSearch] = useState('')
	const [options, setOptions] = useState<FilterOption[]>(filter.options)
	const [count, setCount] = useState(filter.options.length)

	const filterType = filter.filterType
	const variable = filter.variable

	// If the filter is set as "variable", then we need to fetch the options from the backend
	useEffect(() => {
		async function getOptions() {
			const findFilter = variableFilters.find((f: VariableFilter) => f.id === filter.id)

			if (findFilter) {
				filter.options = findFilter.options
				setOptions(findFilter.options)
				setCount(findFilter.options.length)
			} else {
				const fetched = await getData(endpoint + `?type=${filter.id}&action=getOptions`)
				addVariableFilter(fetched, filter.id)
				filter.options = fetched
				setOptions(fetched)
				setCount(fetched.length)
			}
		}

		if (variable && !options.length) {
			getOptions()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
			<div className="thin-scroll max-h-[300px] overflow-y-auto overflow-x-hidden overscroll-contain lg:max-h-[400px]">
				{options &&
					options.map(option => (
						<PresetChoice key={option.value} option={option} filter={filter} active={active} />
					))}
			</div>
		</div>
	)
}
