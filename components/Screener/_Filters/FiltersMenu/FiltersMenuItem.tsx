import { screenerState } from 'components/Screener/screener.state'

type Props = {
	name: string
}

export function FiltersMenuItem({ name }: Props) {
	const search = screenerState(state => state.filterSearch)
	const filterMenu = screenerState(state => state.filterMenu)
	const setFilterMenu = screenerState(state => state.setFilterMenu)

	// If the filter menu is currently active
	if (filterMenu === name) {
		return (
			<li>
				<span
					className="active cursor-pointer border border-transparent"
					data-title={name}
					tabIndex={search.length > 0 ? -1 : 0}
				>
					{name}
				</span>
			</li>
		)
	}

	return (
		<li>
			<span
				className="inactive border border-transparent focus:outline-none"
				data-title={name}
				onClick={() => setFilterMenu(name)}
				onKeyPress={e => e.key === 'Enter' && setFilterMenu(name)}
				tabIndex={search.length > 0 ? -1 : 0}
			>
				{name}
			</span>
		</li>
	)
}
