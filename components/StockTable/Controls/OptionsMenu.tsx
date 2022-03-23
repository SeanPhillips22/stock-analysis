import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useRouter } from 'next/router'
import { useTableContext } from '../TableContext'
import { INITIAL_STOCK_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialStockScreenerState'
import { ExportButtons } from 'components/Controls/Export/ExportButtons'

export function OptionsMenu() {
	const { tableId, fixed, clearState } = useTableContext()
	const router = useRouter()

	// This function adds the filters to the stock screener settings in localStorage
	// Then it redirects the user to the stock screener
	function addFiltersAndGoToScreener() {
		if (typeof window !== 'undefined') {
			// Check if existing in localStorage, otherwise append filters to default screener settings
			let screenerSettings: any = localStorage.getItem('stocks-screener')
			if (screenerSettings) screenerSettings = JSON.parse(screenerSettings)
			else screenerSettings = INITIAL_STOCK_SCREENER_STATE

			// Add the filters to the screener settings
			fixed.screener?.filters?.map(filter => screenerSettings.columns.all.Filtered.push(filter.id))
			screenerSettings.filters = fixed.screener?.filters || []

			// Set the default menu items
			screenerSettings.filtersMenu = 'Active'
			screenerSettings.resultsMenu = 'General'
			delete screenerSettings.activePreset

			// Save the new screener settings in localStorage
			if (screenerSettings.filters) {
				localStorage.setItem('stocks-screener', JSON.stringify(screenerSettings))
			}
		}
		router.push('/screener/stock/')
	}

	return (
		<Dropdown title="Options" classes="divide-y divide-gray-100 whitespace-nowrap">
			<div className="dd" title="Open list in stock screener" onClick={addFiltersAndGoToScreener}>
				Open in Screener
			</div>
			<div className="block md:hidden">
				<ExportButtons tableId={tableId} />
			</div>
			<div className="dd" title="Reset all settings to their default values" onClick={clearState}>
				Reset Table Defaults
			</div>
		</Dropdown>
	)
}
