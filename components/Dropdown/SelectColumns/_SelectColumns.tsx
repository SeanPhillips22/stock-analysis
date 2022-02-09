import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'
import { DataId } from 'types/DataId'
import { ClearColumns } from './ClearColumns'
import { ColumnList } from './ColumnList'
import { ColumnSearch } from './ColumnSearch'

type Props = {
	active: DataId[]
	options: DataId[]
	toggle: (id: DataId) => void
	clear: () => void
	enabled: boolean
}

export function SelectColumns({
	active,
	options,
	toggle,
	clear,
	enabled
}: Props) {
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
			{enabled && <ClearColumns clear={clear} />}
		</Dropdown>
	)
}
