import { CloseInput } from 'components/CloseInput'

type Props = {
	search: string
	setSearch: (search: string) => void
}

/**
 * The search box inside the custom column dropdown
 * @param {string} search
 * @param {function} setSearch
 * @return {JSX.Element}
 */
export function ColumnSearch({ search, setSearch }: Props) {
	return (
		<div className="relative flex items-center">
			<input
				type="text"
				className="w-full border-0 border-b border-gray-200 focus:border-gray-200 focus:ring-0"
				placeholder="Search..."
				value={search}
				onChange={e => setSearch(e.target.value.toLowerCase())}
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	)
}
