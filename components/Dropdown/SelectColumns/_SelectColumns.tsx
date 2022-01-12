import { Dropdown } from 'components/Dropdown/_Dropdown'
import { ColumnList } from './ColumnList'
import { ColumnSearch } from './ColumnSearch'

export function SelectColumns() {
	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch />
			<ColumnList />
		</Dropdown>
	)
}
