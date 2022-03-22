import { Dispatch, SetStateAction } from 'react'

type Props = {
	chartTime: string
	setChartTime: Dispatch<SetStateAction<string>>
	setInitialFetch: Dispatch<SetStateAction<boolean>>
}

export function Controls({ chartTime, setChartTime, setInitialFetch }: Props) {
	function change(range: string) {
		setChartTime(range)
		setInitialFetch(false)
	}

	return (
		<ul className="price-chart">
			<li>
				<button className={chartTime === '1D' ? 'active' : 'inactive'} onClick={() => change('1D')}>
					<span>1D</span>
					<span>1 Day</span>
				</button>
			</li>
			<li>
				<button className={chartTime === '5D' ? 'active' : 'inactive'} onClick={() => change('5D')}>
					<span>5D</span>
					<span>5 Days</span>
				</button>
			</li>
			<li>
				<button className={chartTime === '1M' ? 'active' : 'inactive'} onClick={() => change('1M')}>
					<span>1M</span>
					<span>1 Month</span>
				</button>
			</li>
			<li>
				<button className={chartTime === 'YTD' ? 'active' : 'inactive'} onClick={() => change('YTD')}>
					YTD
				</button>
			</li>
			<li>
				<button className={chartTime === '1Y' ? 'active' : 'inactive'} onClick={() => change('1Y')}>
					<span>1Y</span>
					<span>1 Year</span>
				</button>
			</li>
			<li>
				<button className={chartTime === '5Y' ? 'active' : 'inactive'} onClick={() => change('5Y')}>
					<span>5Y</span>
					<span>5 Years</span>
				</button>
			</li>
			<li>
				<button className={chartTime === 'MAX' ? 'active' : 'inactive'} onClick={() => change('MAX')}>
					Max
				</button>
			</li>
		</ul>
	)
}

export default Controls
