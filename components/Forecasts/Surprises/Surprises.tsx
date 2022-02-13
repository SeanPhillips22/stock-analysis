import { RevenueChart } from '../Revenue/RevenueChart'

export function Surprises() {
	return (
		<div className="min-h-[400px] border border-gray-200 p-4">
			<h2 className="hh3">Earnings Surprises</h2>
			<RevenueChart />
		</div>
	)
}
