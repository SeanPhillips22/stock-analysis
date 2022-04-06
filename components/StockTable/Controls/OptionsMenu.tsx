import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useRouter } from 'next/router'
import { useTableContext } from '../TableContext'
import { INITIAL_STOCK_SCREENER_STATE } from 'components/Screener/maps/InitialStates/initialStockScreenerState'
import { ExportButtons } from 'components/Controls/Export/ExportButtons'
import { screenerState } from '../../Screener/screener.state'
import { useEvent } from 'hooks/useEvent'
import { SplitTestAny } from 'components/SplitTest'
import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'

export function OptionsMenu() {
	const [buttonTitle, setButtonTitle] = useState('Options')
	const setResultsMenu = screenerState(state => state.setResultsMenu)
	const { tableId, fixed, clearState } = useTableContext()
	const router = useRouter()
	const { event } = useEvent()

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

			// Add the sort to the screener settings
			if (fixed.screener?.sort) screenerSettings.sort.active = fixed.screener.sort

			// Set the results menu as active, if applicable
			let filteredColumns = fixed.screener?.filters?.map(i => i.id)
			screenerSettings.columns.all.Filtered =
				fixed.screener?.showColumns || screenerSettings.columns.filtered.concat(filteredColumns)
			if (fixed.screener?.showResultsMenu) {
				setResultsMenu('Filtered')
			}

			// Set the default menu items
			delete screenerSettings.activePreset

			// Save the new screener settings in localStorage
			if (screenerSettings.filters) {
				localStorage.setItem('stocks-screener', JSON.stringify(screenerSettings))
			}
		}
		router.push('/screener/stock/')
	}

	useEffect(() => {
		setButtonTitle(SplitTestAny('Options', 'More'))
	}, [])

	return (
		<Dropdown
			title={buttonTitle}
			classes="divide-y divide-gray-100 whitespace-nowrap"
			onClick={() => event('Options_Menu', { type: buttonTitle })}
		>
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
			<div className="block py-0.5 md:hidden">
				<ExportButtons tableId={tableId} />
			</div>
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
					Reset Table Defaults
				</div>
			</Popover.Button>
		</Dropdown>
	)
}
