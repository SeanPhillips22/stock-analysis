import { Dropdown } from 'components/Dropdown/_Dropdown'
// import { useScreenerContext } from 'components/Screener/ScreenerContext'

export function OptionsMenu() {
	// const { resetState } = useScreenerContext()

	return (
		<Dropdown title="More">
			{/* <div className="dd" onClick={resetState} title="Reset all settings to their default values"> */}
			<div className="dd" title="Reset all settings to their default values">
				Reset Screener
			</div>
		</Dropdown>
	)
}
