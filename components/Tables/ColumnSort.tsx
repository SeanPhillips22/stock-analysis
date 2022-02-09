import { SortDownIcon } from 'components/Icons/SortDown'
import { SortUpIcon } from 'components/Icons/SortUp'

type Props = {
	column: any
}

export function ColumnSort({ column }: Props) {
	let { isSorted, isSortedDesc } = column

	if (isSorted) {
		if (isSortedDesc) {
			return <SortDownIcon classes="h-4 w-4 text-gray-800" />
		}
		return <SortUpIcon classes="h-4 w-4 text-gray-800" />
	}

	return null
}
