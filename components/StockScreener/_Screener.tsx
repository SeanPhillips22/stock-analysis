import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu'
import { FiltersList } from './_Filters/FilterItemsList/FiltersList'
import { ResultsBody } from './_Results/ResultsBody/ResultsBody'
import { AboveScreener } from './_Above/_AboveScreener'

export function Screener() {
	return (
		<>
			<AboveScreener />
			<div className="border rounded p-2 bg-gray-50">
				<FiltersMenu />
				<FiltersList />
			</div>
			<ResultsBody />
		</>
	)
}
