import { useModifyFilters } from '../../functions/useModifyFilters'
import { useModifyColumns } from '../../functions/useModifyColumns'
import { screenerState } from '../../screener.state'
import { useSavedScreens } from './useSavedScreens'
import { ScreenerTypes } from 'components/StockScreener/screener.types'
import { XIcon } from '@heroicons/react/solid'
import { getDataPoints } from 'components/StockScreener/maps/dataPoints'

type Props = {
	name: string
	type: ScreenerTypes
}

export function SavedItem({ name, type }: Props) {
	const setFilterMenu = screenerState(state => state.setFilterMenu)
	const { data, del } = useSavedScreens(type)
	const { add, clear } = useModifyFilters()
	const { fetchColumn } = useModifyColumns()

	function renderPresetFilters(value: string) {
		const DataPoints = getDataPoints(type)
		clear()
		setFilterMenu('Active')

		let screens = data.screeners[type]
		Object.keys(screens).forEach(key => {
			if (screens[key].name === value) {
				screens[key].filters.map((filter: any) => {
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
			}
		})
	}

	async function handleDelete(name: string) {
		del.mutate(name)
	}

	return (
		<div className="w-full flex justify-between hover:bg-gray-50">
			<div
				className="py-2 pl-2 pr-5 block cursor-pointer hover:font-medium focus:font-medium"
				onClick={() => renderPresetFilters(name)}
				onKeyPress={e => {
					if (e.key === 'Enter') {
						renderPresetFilters(name)
					}
				}}
				tabIndex={0}
			>
				{name}
			</div>
			<div
				className="flex items-center p-1 pr-2 text-gray-500 hover:text-red-500 cursor-pointer"
				title="Delete"
				onClick={() => handleDelete(name)}
			>
				<XIcon className="w-4 h-4" />
			</div>
		</div>
	)
}
