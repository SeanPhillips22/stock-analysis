import { useModifyFilters } from '../../functions/useModifyFilters'
import { useModifyColumns } from '../../functions/useModifyColumns'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { Menu } from '@headlessui/react'
import { cn } from 'functions/helpers/classNames'
import { useScreenerContext } from 'components/Screener/ScreenerContext'
import { FilterValue } from 'components/Screener/screener.types'
import { screenerState } from 'components/Screener/screener.state'

export function PresetScreens() {
	const { endpoint, state, dispatch, presets, dataPoints } = useScreenerContext()
	const setFilterMenu = screenerState(state => state.setFilterMenu)
	const { clear } = useModifyFilters()
	const { fetchColumn } = useModifyColumns(endpoint)

	function renderPresetFilters(value: string) {
		clear()
		setFilterMenu('Active')
		dispatch({ type: 'SET_ACTIVE_PRESET', value })
		let addFilters: FilterValue[] = []
		presets.map(item => {
			if (item.name === value) {
				item.filters.map(filter => {
					let dp = dataPoints.find(item => item.id === filter.id)
					if (dp) {
						addFilters.push({
							id: filter.id,
							name: dp.name,
							value: filter.value,
							filterType: dp.filterType,
							numberType: dp.numberType
						})
						fetchColumn(filter.id)
					}
				})
				if (item.sort) {
					dispatch({
						type: 'SET_SORT',
						value: [item.sort]
					})
				}
				// Add all the preset filter values to the "Filtered" column
				// Then set the active results menu to "Filtered"
				let cols = [...state.columns.all.Filtered]
				item.filters.map(filter => {
					cols.push(filter.id)
				})
				dispatch({ type: 'SET_RESULTS_MENU', value: 'Filtered' })
				dispatch({ type: 'SET_FILTERS', value: addFilters })
			}
		})
	}

	return (
		<div className="flex w-[50%] md:block md:w-auto">
			<div className="hidden text-sm font-medium text-gray-800 md:block">Preset Screens</div>
			<Dropdown
				title={state.activePreset || 'Select preset'}
				menuClasses="grow"
				btnClasses={cn('justify-between text-sm font-normal', state.activePreset ? 'bg-yellow-100' : '')}
				icnClasses="text-gray-700"
				classes="min-w-[150px] -right-2 xs:min-w-[160px] xs:right-0"
			>
				{presets.map(item => (
					<Menu.Item key={item.name}>
						<div
							className={cn('dd', state.activePreset === item.name ? 'active' : '')}
							onClick={() => renderPresetFilters(item.name)}
						>
							{item.name}
						</div>
					</Menu.Item>
				))}
			</Dropdown>
		</div>
	)
}
