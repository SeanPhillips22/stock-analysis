import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	BarController,
	BarElement,
	Tooltip,
	LinearScale,
	Title,
	CategoryScale,
	defaults
} from 'chart.js'

ChartJS.register(BarController, BarElement, Tooltip, LinearScale, Title, CategoryScale)

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'"

let xaxis = [2019, 2020, 2021, 2022, 2023, 2024]
let yaxis = [260174, 274515, 365817, 377123, 389213, 405112]

let datasets = [
	{
		label: 'Years',
		data: yaxis
	}
]

export function RevenueChart() {
	return (
		<div>
			<Line
				id="1"
				data={{
					labels: xaxis,
					datasets: datasets
				}}
				options={{}}
			/>
		</div>
	)
}
