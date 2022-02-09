import { ChevronDoubleLeftIcon } from 'components/Icons/ChevronDoubleLeftIcon'
import { ChevronDoubleRightIcon } from 'components/Icons/ChevronDoubleRightIcon'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'

export function Collapse() {
	const expanded = navMenuState(state => state.expanded)
	const toggleExpanded = navMenuState(state => state.toggleExpanded)

	return (
		<div
			className="collapse"
			onClick={toggleExpanded}
			title={expanded ? 'Collapse Menu' : 'Expand Menu'}
		>
			<div className="nav-item">
				{expanded ? (
					<ChevronDoubleLeftIcon
						className="nav-icon"
						style={{ maxWidth: '50px' }}
					/>
				) : (
					<ChevronDoubleRightIcon
						className="nav-icon"
						style={{ maxWidth: '50px' }}
					/>
				)}

				<span className="nav-label">Collapse</span>
			</div>
		</div>
	)
}
