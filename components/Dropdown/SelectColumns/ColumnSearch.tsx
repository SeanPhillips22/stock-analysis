import { CloseInput } from 'components/CloseInput'

type Props = {
	search: string
	setSearch: (search: string) => void
}

export function ColumnSearch({ search, setSearch }: Props) {
	return (
		<div className="search-wrap">
			<input
				autoFocus
				type="text"
				placeholder="Search..."
				value={search}
				onChange={e => setSearch(e.target.value.toLowerCase())}
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	)
}
