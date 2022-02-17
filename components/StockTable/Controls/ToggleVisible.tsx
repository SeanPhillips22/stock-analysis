import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ChevronUpIcon } from 'components/Icons/ChevronUpIcon'
import { useTableContext } from '../TableContext'

export function ToggleVisible() {
	const { dynamic, setState } = useTableContext()

	function toggle() {
		console.log('toggle')
		setState({ showOnMobile: !dynamic.showOnMobile })
	}

	if (dynamic.showOnMobile) {
		return (
			<div className="toggle" onClick={() => toggle()}>
				<ChevronUpIcon className="toggle-icon" />
			</div>
		)
	}

	return (
		<div className="toggle" onClick={() => toggle()}>
			<ChevronDownIcon className="toggle-icon" />
		</div>
	)
}
