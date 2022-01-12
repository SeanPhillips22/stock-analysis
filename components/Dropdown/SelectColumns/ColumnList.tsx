import { StockDataArray, StockDataPoints } from 'data/StockDataPoints'
import { ColumnItem } from './ColumnItem'

export function ColumnList() {
	return (
		<div className="column-list">
			{StockDataArray.map((id) => (
				<ColumnItem key={id} id={id} name={StockDataPoints[id]?.name} />
			))}
		</div>
	)
}
