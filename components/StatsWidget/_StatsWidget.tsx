import { StatisticType } from 'types/Statistics'
import { FinancialsMapType } from 'types/Financials'
import { Tooltip } from './StatsTooltips'
import styles from './StatsWidget.module.css'

interface Props {
	title: string
	data: StatisticType
	map: FinancialsMapType[]
}

export const StatsWidget = ({ title, data, map }: Props) => {
	return (
		<>
			<h2 className="mb-2 px-0.5 text-xl font-bold text-gray-900 xs:text-[1.3rem]">
				{title}
			</h2>
			<p className="mb-4 px-0.5 text-base leading-relaxed text-gray-900 xs:text-[1.05rem] lg:leading-normal">
				{data.text}
			</p>
			<table className={'text-sm xs:text-base ' + styles.statstable}>
				<tbody>
					{data.data.map(item => {
						const indicatorInfo = map.find(info => info.id === item[0])

						return (
							<tr key={item[0]}>
								<td>
									<Tooltip data={indicatorInfo} indicator={item[1]} />
								</td>
								<td title={item[3]}>{item[2]}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}
