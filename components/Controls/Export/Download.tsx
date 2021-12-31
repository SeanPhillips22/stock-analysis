import ExcellentExport from 'excellentexport'
import { navState } from 'state/navState'
import {
	extractFinancialValues,
	extractTextFromHTML,
	removeNanValues
} from './export.functions'

interface Props {
	title: string
	type: 'csv' | 'xlsx'
	data: any
	fileName?: string
}

export default function Download({ title, type, data, fileName }: Props) {
	const path = navState((state) => state.path)

	const fn = fileName
		? fileName
		: `${path.one}${path.two ? '-' + path.two : ''}${
				path.three ? '-' + path.three : ''
		  }`

	let returnObject: any

	if (data === 'financial-table') {
		returnObject = {
			name: path.two?.toUpperCase() || 'Export',
			from: { table: data },
			fixValue: extractFinancialValues
		}
	} else if (typeof data === 'string') {
		returnObject = {
			name: 'Export',
			from: { table: data },
			fixValue: extractTextFromHTML
		}
	} else {
		returnObject = {
			name: 'Export',
			from: { array: data },
			fixValue: removeNanValues
		}
	}

	const returnArray = [returnObject]

	function download(type: 'csv' | 'xlsx') {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: fn,
				format: type
			},
			returnArray
		)
	}

	return (
		<div
			className="text-gray-700 hover:bg-gray-100 block px-4 py-2 text-sm cursor-pointer"
			onClick={() => {
				download(type)
			}}
		>
			{title}
		</div>
	)
}
