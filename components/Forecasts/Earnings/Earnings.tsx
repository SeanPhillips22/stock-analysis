import { RevenueChart } from '../Revenue/RevenueChart'

export function Earnings() {
	return (
		<div className="min-h-[300px] border border-gray-200 p-4 lg:order-2">
			<h2 className="hh3">Earnings Forecast</h2>
			<RevenueChart />
		</div>
	)
}
