import { Dropdown } from 'components/Dropdown/_Dropdown'
import { ColumnItemWrap } from 'components/StockScreener/_Results/ResultsMenu/ColumnSelection/ColumnItemWrap'
import { ColumnSearch } from './ColumnSearch'

export function TableColumns() {
	return (
		<Dropdown title="Columns">
			<ColumnSearch />
			<ColumnItemWrap search={''} type={''} />
		</Dropdown>
	)
}
