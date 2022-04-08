import { ThreeDotMenu } from 'components/Dropdown/ThreeDotMenu'
import { useRouter } from 'next/router'
import { useTableContext } from '../TableContext'
import { INITIAL_STOCK_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialStockScreenerState'
import { screenerState } from '../../Screener/screener.state'
import { useEvent } from 'hooks/useEvent'
import { Popover } from '@headlessui/react'

export function OptionsMenu() {
	const setFilterMenu = screenerState(state => state.setFilterMenu)
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const { fixed, clearState } = useTableContext()
	const router = useRouter()
	const { event } = useEvent()

	// This function adds the filters to the stock screener settings in localStorage
	// Then it redirects the user to the stock screener
	function addFiltersAndGoToScreener() {
		if (typeof window !== 'undefined') {
			const { type } = fixed.screener || {}

			// Check if existing in localStorage, otherwise append filters to default screener settings
			let screenerId = type === 'stocks' ? 'stocks-screener' : type === 'ipo' ? 'ipo-screener' : 'etf-screener'
			let screenerSettings: any = localStorage.getItem(screenerId)
			if (screenerSettings) screenerSettings = JSON.parse(screenerSettings)
			else screenerSettings = INITIAL_STOCK_SCREENER_STATE

			// Add the filters to the screener settings
			fixed.screener?.filters?.map(filter => screenerSettings.columns.all.Filtered.push(filter.id))
			screenerSettings.filters = fixed.screener?.filters || []

			// Add the sort to the screener settings
			if (fixed.screener?.sort) screenerSettings.sort.active = fixed.screener.sort

			// Set the results menu as active, if applicable
			let filteredColumns = fixed.screener?.filters?.map(i => i.id)
			screenerSettings.columns.all.Filtered =
				fixed.screener?.showColumns || screenerSettings.columns.filtered.concat(filteredColumns)

			// Set the results and filter menus
			setFilterMenu('Active')
			if (fixed.screener?.showResultsMenu) setResultsMenu('Filtered')
			else setResultsMenu('General')

			// Set the default menu items
			delete screenerSettings.activePreset

			// Save the new screener settings in localStorage
			if (screenerSettings.filters) {
				localStorage.setItem(screenerId, JSON.stringify(screenerSettings))
			}

			router.push(type === 'stocks' ? '/screener/stock/' : `/screener/${type}/`)
		}
	}

	return (
		<ThreeDotMenu classes="divide-y divide-gray-100 whitespace-nowrap" onClick={() => event('More_Menu')}>
			{!fixed.hideOpenInScreener && (
				<Popover.Button as="div">
					<div
						className="dd"
						title="Open list in stock screener"
						id="tag-feat-options-open-in-screener"
						onClick={() => {
							event('Open_In_Screener')
							addFiltersAndGoToScreener()
						}}
						tabIndex={0}
					>
						Open in Screener
					</div>
				</Popover.Button>
			)}
			<Popover.Button as="div">
				<div
					className="dd"
					title="Reset all settings to their default values"
					id="tag-feat-options-reset-table-defaults"
					onClick={() => {
						clearState()
						event('Reset_Table_Defaults')
					}}
					tabIndex={0}
				>
					Reset Table Settings
				</div>
			</Popover.Button>
		</ThreeDotMenu>
	)
}
