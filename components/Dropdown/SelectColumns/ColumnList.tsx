import { DataPointArray, DataPoints, DataPointType } from 'data/StockDataPoints'
import { DataId } from 'types/Data'
import { ColumnItem } from './ColumnItem'

type Props = {
	active: DataId[]
}

export function ColumnList({ active }: Props) {
	let activeArray: DataPointType[] = []
	let inactiveArray: DataPointType[] = []

	DataPointArray.forEach((item) => {
		let { id, name } = DataPoints[item]
		if (id !== 's') {
			if (active.includes(item)) activeArray.push({ id, name })
			else inactiveArray.push({ id, name })
		}
	})

	return (
		<div className="column-list">
			{activeArray.map((item) => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					checked={true}
				/>
			))}
			{inactiveArray.map((item) => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					checked={false}
				/>
			))}
		</div>
	)
}
