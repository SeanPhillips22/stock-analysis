import { screenerState } from 'components/Screener/screener.state'

type Props = {
	name: string
}

export function FiltersMenuItem({ name }: Props) {
	const search = screenerState(state => state.filterSearch)
	const filterMenu = screenerState(state => state.filterMenu)
	const setFilterMenu = screenerState(state => state.setFilterMenu)

	if (filterMenu === name) {
		return (
			<li>
				<span
					className="active cursor-pointer"
					data-title={name}
					onClick={() => setFilterMenu('Active')}
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
				className="inactive focus:bg-gray-200 focus:outline-none"
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
