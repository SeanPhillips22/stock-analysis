import { Results } from './_Results/_Results'
import { AboveScreener } from './_Above/_AboveScreener'
import { Filters } from './_Filters/_Filters'

// The screener can be split into 3 main parts:
// 1. The "Above Screener" area: Title, preset screens and saved screens
// 2. The "Filters" area: The filter menu and list of filters that are used to narrow down the results
// 3. The "Results" area: The list of stocks that match the filters, with menu items and table

export default function Screener() {
	return (
		<>
			<AboveScreener />
			<Filters />
			<Results />
		</>
	)
}
