import { FilterOption, FilterProps, VariableFilter } from 'components/Screener/screener.types'
import { getData } from 'functions/apis/API'
import { useEffect, useState } from 'react'
import { screenerState } from 'components/Screener/screener.state'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { MultiSelect } from './Choices/MultiSelect'

type Props = {
	filter: FilterProps
	active: string | false
}

export function SelectFilter({ filter, active }: Props) {
	const { endpoint } = useScreenerContext()
	const variableFilters = screenerState(state => state.variableFilters)
	const addVariableFilter = screenerState(state => state.addVariableFilter)
	const [hasSearch, setHasSearch] = useState(false)
	const [search, setSearch] = useState('')
	const [options, setOptions] = useState<FilterOption[]>(filter.options)

	const filterType = filter.filterType
	const variable = filter.variable

	// Check if the filter should have a search bar
	useEffect(() => {
		if (
			filterType === 'stringmatch' ||
			((filterType === 'multiselect' || filterType === 'multiselectarray') && options.length > 6)
		) {
			setHasSearch(true)
		}
	}, [filterType, options.length])

	// If the filter is set as "variable", then we need to fetch the options from the backend
	useEffect(() => {
		async function getOptions() {
			const findFilter = variableFilters.find((f: VariableFilter) => f.id === filter.id)

			if (findFilter) {
				filter.options = findFilter.options
				setOptions(findFilter.options)
			} else {
				const fetched = await getData(endpoint + `?type=${filter.id}&action=getOptions`)
				addVariableFilter(fetched, filter.id)
				filter.options = fetched
				setOptions(fetched)
			}
		}

		if (variable && !options.length) {
			getOptions()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (hasSearch) {
			if (search.length > 0) {
				const filtered = filter.options.filter(option => option.name.toLowerCase().includes(search.toLowerCase()))
				setOptions(filtered)
			} else {
				setOptions(filter.options)
			}
		}
	}, [search, filterType, hasSearch, filter.options])

	useEffect(() => {
		if (hasSearch) {
			if (!active) {
				setSearch('')
				setOptions(filter.options)
			}
		}
	}, [active, filter.options, filterType, hasSearch])

	return (
		<div className="py-1">
			{hasSearch && (
				<input
					type="text"
					className="w-full border-0 border-b border-gray-200 focus:border-gray-200 focus:ring-0"
					placeholder="Search..."
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			)}
			<div className="thin-scroll max-h-[300px] min-w-[150px] max-w-[260px] space-y-2 overflow-y-auto overflow-x-hidden overscroll-contain whitespace-nowrap p-2 text-sm xs:max-w-[300px] bp:max-w-none lg:max-h-[400px] lg:min-w-[250px]">
				{options && options.map(option => <MultiSelect key={option.value} filter={filter} option={option} />)}
			</div>
		</div>
	)
}
