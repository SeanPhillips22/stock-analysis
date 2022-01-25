import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'
import { DataId } from 'types/DataId'
import { ColumnList } from './ColumnList'
import { ColumnSearch } from './ColumnSearch'

type Props = {
	active: DataId[]
	options: DataId[]
	toggle: (id: DataId) => void
}

export function SelectColumns({ active, options, toggle }: Props) {
	const [search, setSearch] = useState<string>('')

	return (
		<Dropdown title="Columns" classes="wide">
			<ColumnSearch search={search} setSearch={setSearch} />
			<ColumnList
				_active={active}
				options={options}
				search={search}
				toggle={toggle}
			/>
		</Dropdown>
	)
}
