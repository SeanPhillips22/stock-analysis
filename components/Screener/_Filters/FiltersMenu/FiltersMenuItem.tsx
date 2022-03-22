import { screenerState } from 'components/Screener/screener.state'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	name: string
}

export function FiltersMenuItem({ name }: Props) {
	const { state, dispatch } = useScreenerContext()
	const search = screenerState(state => state.filterSearch)

	// If the filter menu is currently active
	if (state?.filtersMenu === name) {
		return (
			<li>
				<span className="active cursor-pointer" data-title={name} tabIndex={search.length > 0 ? -1 : 0}>
					{name}
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="inactive focus:bg-gray-200 focus:outline-none"
				data-title={name}
				onClick={() => dispatch({ type: 'SET_FILTERS_MENU', value: name })}
				onKeyPress={e => e.key === 'Enter' && dispatch({ type: 'SET_FILTERS_MENU', value: name })}
				tabIndex={search.length > 0 ? -1 : 0}
			>
				{name}
			</span>
		</li>
	)
}
