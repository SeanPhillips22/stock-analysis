import { FiltersMap } from 'components/StockScreener/maps/filters.map'
import { useModifyFilters } from '../functions/useModifyFilters'
import { useModifyColumns } from '../functions/useModifyColumns'
import { screenerState } from '../screener.state'
import { returnFilteredColumns } from '../maps/resultColumns.map'

export function PresetFilters() {
	const type = screenerState((state) => state.type)
	const presets = screenerState((state) => state.presets)
	const setSort = screenerState((state) => state.setSort)
	const setFilterMenu = screenerState((state) => state.setFilterMenu)
	const activePreset = screenerState((state) => state.activePreset)
	const setActivePreset = screenerState((state) => state.setActivePreset)
	const setShowColumns = screenerState((state) => state.setShowColumns)
	const resultsMenu = screenerState((state) => state.resultsMenu)
	const setResultsMenu = screenerState((state) => state.setResultsMenu)
	const { add, clear } = useModifyFilters()
	const { fetchColumn } = useModifyColumns()

	function renderPresetFilters(value: string) {
		clear()
		setFilterMenu('Active')
		setActivePreset(value)
		presets?.map((item) => {
			if (item.name === value) {
				item.filters.map((filter) => {
					FiltersMap.map((mapItem) => {
						if (mapItem.id === filter.id) {
							add(
								filter.id,
								mapItem.name,
								filter.value,
								mapItem.filterType,
								mapItem.numberType
							)
							fetchColumn(filter.id, type)
						}
					})
				})
				if (item.sort) {
					setSort([item.sort])
					setResultsMenu('Filtered')
				}
				// If "Filtered" menu is selected, add all the values
				if (resultsMenu === 'Filtered') {
					const cols = returnFilteredColumns(type)
					item.filters.map((filter) => {
						cols.push(filter.id)
					})
					setShowColumns(cols)
				}
			}
		})
	}

	return (
		<div>
			<label
				htmlFor="location"
				className="hidden md:block text-sm font-medium text-gray-700"
			>
				Preset Screens
			</label>
			<select
				id="location"
				name="location"
				className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:ring-0 focus:ring-blue-500 focus:border-blue-500 rounded-md cursor-pointer"
				value={activePreset || 'Select preset'}
				onChange={(e) => renderPresetFilters(e.target.value)}
			>
				<option value="Select preset">Select preset</option>
				{presets?.map((item) => (
					<option key={item.name} value={item.name}>
						{item.name}
					</option>
				))}
			</select>
		</div>
	)
}
