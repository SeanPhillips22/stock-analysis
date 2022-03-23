import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useTableContext } from '../TableContext'

export function OptionsMenu() {
	const { clearState } = useTableContext()

	return (
		<Dropdown title="More">
			<div className="dd" title="Open list in stock screener">
				Open in Screener
			</div>
			<div className="dd" title="Reset all settings to their default values" onClick={clearState}>
				Reset Table
			</div>
		</Dropdown>
	)
}
