import { useModifyFilters } from '../../functions/useModifyFilters'
import { useModifyColumns } from '../../functions/useModifyColumns'
import { screenerState } from '../../screener.state'
import { returnFilteredColumns } from '../../maps/resultColumns.map'
import { getDataPoints } from 'components/Screener/maps/dataPoints'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { Menu } from '@headlessui/react'
import { cn } from 'functions/helpers/classNames'

export function PresetScreens() {
	const type = screenerState(state => state.type)
	const presets = screenerState(state => state.presets)
	const setSort = screenerState(state => state.setSort)
	const setResetSort = screenerState(state => state.setResetSort)
	const setFilterMenu = screenerState(state => state.setFilterMenu)
	const activePreset = screenerState(state => state.activePreset)
	const setActivePreset = screenerState(state => state.setActivePreset)
	const setShowColumns = screenerState(state => state.setShowColumns)
	const resultsMenu = screenerState(state => state.resultsMenu)
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const { add, clear } = useModifyFilters()
	const { fetchColumn } = useModifyColumns()

	function renderPresetFilters(value: string) {
		const DataPoints = getDataPoints(type)
		clear()
		setFilterMenu('Active')
		setActivePreset(value)
		setResetSort(true)
		presets?.map(item => {
			if (item.name === value) {
				item.filters.map(filter => {
					let dp = DataPoints.find(item => item.id === filter.id)
					if (dp) {
						add(
							filter.id,
							dp.name,
							filter.value,
							dp.filterType,
							dp.numberType
						)
						fetchColumn(filter.id, type)
					}
				})
				if (item.sort) {
					setSort([item.sort])
					setResultsMenu('Filtered')
				}
				// If "Filtered" menu is selected, add all the values
				if (resultsMenu === 'Filtered') {
					const cols = returnFilteredColumns(type)
					item.filters.map(filter => {
						cols.push(filter.id)
					})
					setShowColumns(cols)
				}
			}
		})
	}

	return (
		<div className="flex w-[50%] md:block md:w-auto">
			<div className="hidden text-sm font-medium text-gray-800 md:block">
				Preset Screens
			</div>
			<Dropdown
				title={activePreset || 'Select preset'}
				menuClasses="grow"
				btnClasses="justify-between text-sm font-normal"
				icnClasses="text-gray-700"
				classes="min-w-[150px] -right-2 xs:min-w-[160px] xs:right-0"
			>
				{presets?.map(item => (
					<Menu.Item key={item.name}>
						<div
							className={cn(
								'dd',
								activePreset === item.name ? 'active' : ''
							)}
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
