import { ColumnItemWrap } from './ColumnItemWrap'
import { ColumnSearch } from './ColumnSearch'
import { ScreenerTypes } from 'components/Screener/screener.types'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { useState } from 'react'

/**
 * The custom columns dropdown. It contains a search filter and checkbox for each column.
 * @return {JSX.Element}
 */

type Props = {
	type: ScreenerTypes
}

export function ColumnDropdown({ type }: Props) {
	const [search, setSearch] = useState('')

	return (
		<Dropdown title="Columns" classes="wide" btnClasses="text-sm">
			<ColumnSearch search={search} setSearch={setSearch} />
			<ColumnItemWrap search={search} type={type} />
		</Dropdown>
	)
}