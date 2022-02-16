import { ResultsMenuItem } from 'components/StockScreener/_Results/ResultsMenu/ResultsMenuItem'

interface Props {
	type: string
}
export function ResultsNav({ type }: Props) {
	return (
		<nav className="grow py-3 lg:py-1">
			<ul className="flex flex-row items-center space-x-0.5 whitespace-nowrap text-base">
				{(type == 'stocks' && (
					<>
						<ResultsMenuItem type={type} name="General" />
						<ResultsMenuItem type={type} name="Filtered" />
						<ResultsMenuItem type={type} name="Performance" />
						<ResultsMenuItem type={type} name="Financials" />
						<ResultsMenuItem type={type} name="Valuation" />
						<ResultsMenuItem type={type} name="Dividends" />
						<ResultsMenuItem type={type} name="Analysts" />
					</>
				)) ||
					(type == 'ipo' && (
						<>
							<ResultsMenuItem type={type} name="General" />
							<ResultsMenuItem type={type} name="Filtered" />
							<ResultsMenuItem type={type} name="Company" />
							<ResultsMenuItem type={type} name="Income" />
							<ResultsMenuItem type={type} name="Balance Sheet" />
							<ResultsMenuItem type={type} name="Cash Flow" />
						</>
					)) ||
					(type == 'etf' && (
						<>
							<ResultsMenuItem type={type} name="General" />
							<ResultsMenuItem type={type} name="Filtered" />
							<ResultsMenuItem type={type} name="Dividends" />
							<ResultsMenuItem type={type} name="Performance" />
						</>
					))}
			</ul>
		</nav>
	)
}
