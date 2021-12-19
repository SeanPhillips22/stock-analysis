import { screenerDataState } from '../screenerdata.state'
import { FiltersMap } from 'components/StockScreener/maps/filters.map'
import { useModifyFilters } from '../functions/useModifyFilters'
import { useModifyColumns } from '../functions/useModifyColumns'
import { screenerState } from '../screener.state'
import { useState } from 'react'

export function PresetFilters() {
	const [selected, setSelected] = useState('')
	const type = screenerDataState((state) => state.type)
	const presets = screenerState((state) => state.presets)
	const setFilterMenu = screenerState((state) => state.setFilterMenu)
	const { add, clear } = useModifyFilters()
	const { fetchColumn } = useModifyColumns()

	function renderPresetFilters(value: string) {
		clear()
		setFilterMenu('Active')
		setSelected(value)
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
				className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:ring-0 focus:ring-blue-500 focus:border-blue-500 rounded-md"
				value={selected || 'Select preset'}
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
