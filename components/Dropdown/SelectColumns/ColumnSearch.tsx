import { CloseInput } from 'components/CloseInput'

export function ColumnSearch() {
	return (
		<div className="input-wrap">
			<input
				type="text"
				className="border-0 border-b border-gray-200 w-full focus:ring-0 focus:border-gray-200"
				placeholder="Search..."
			/>
			<CloseInput search={''} setSearch={() => null} />
		</div>
	)
}
