import { ResultsMenuItem } from 'components/Screener/_Results/ResultsMenu/ResultsMenuItem'

interface Props {
	type: string
}
export function ResultsNav({ type }: Props) {
	return (
		<nav className="grow py-3 lg:py-1">
			<ul className="flex flex-row items-center space-x-0.5 whitespace-nowrap text-base">
				{(type == 'stocks' && (
					<>
						<ResultsMenuItem name="General" />
						<ResultsMenuItem name="Filtered" />
						<ResultsMenuItem name="Performance" />
						<ResultsMenuItem name="Financials" />
						<ResultsMenuItem name="Valuation" />
						<ResultsMenuItem name="Dividends" />
						<ResultsMenuItem name="Analysts" />
					</>
				)) ||
					(type == 'ipo' && (
						<>
							<ResultsMenuItem name="General" />
							<ResultsMenuItem name="Filtered" />
							<ResultsMenuItem name="Company" />
							<ResultsMenuItem name="Income" />
							<ResultsMenuItem name="Balance Sheet" />
							<ResultsMenuItem name="Cash Flow" />
						</>
					)) ||
					(type == 'etf' && (
						<>
							<ResultsMenuItem name="General" />
							<ResultsMenuItem name="Filtered" />
							<ResultsMenuItem name="Dividends" />
							<ResultsMenuItem name="Performance" />
						</>
					))}
			</ul>
		</nav>
	)
}
