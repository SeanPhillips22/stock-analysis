import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'
import { DataId } from 'types/Data'
import { ColumnList } from './ColumnList'
import { ColumnSearch } from './ColumnSearch'

type Props = {
	active: DataId[]
}

export function SelectColumns({ active }: Props) {
	const [search, setSearch] = useState<string>('')

	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch search={search} setSearch={setSearch} />
			<ColumnList _active={active} search={search} />
		</Dropdown>
	)
}
