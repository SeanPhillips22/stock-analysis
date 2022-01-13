import { Dropdown } from 'components/Dropdown/_Dropdown'
import { DataId } from 'types/Data'
import { ColumnList } from './ColumnList'
import { ColumnSearch } from './ColumnSearch'

type Props = {
	active: DataId[]
}

export function SelectColumns({ active }: Props) {
	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch />
			<ColumnList active={active} />
		</Dropdown>
	)
}
