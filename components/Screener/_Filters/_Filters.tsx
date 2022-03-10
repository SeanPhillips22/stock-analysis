import { FiltersList } from './FilterItems/FiltersList'
import { FiltersMenu } from './FiltersMenu/_FiltersMenu'

export function Filters() {
	return (
		<div className="rounded border bg-gray-50 p-2">
			<FiltersMenu />
			<FiltersList />
		</div>
	)
}
