import { CloseInput } from 'components/CloseInput'

export function ColumnSearch() {
	return (
		<div className="search-wrap">
			<input type="text" placeholder="Search..." />
			<CloseInput search={''} setSearch={() => null} />
		</div>
	)
}
