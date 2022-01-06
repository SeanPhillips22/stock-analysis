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
	returnData?: any
}

export default function Download({
	title,
	type,
	data,
	fileName,
	returnData
}: Props) {
	const path = navState((state) => state.path)

	let fn = fileName
		? fileName
		: `${path.one}${path.two ? '-' + path.two : ''}${
				path.three ? '-' + path.three : ''
		  }`

	let returnArray: any

	if (title === 'Bulk Export') {
		returnArray = returnData
		fn = `${path.two}-financials`
	} else if (data === 'financial-table') {
		returnArray = [
			{
				name: path.two?.toUpperCase() || 'Export',
				from: { table: data },
				fixValue: extractFinancialValues
			}
		]
	} else if (typeof data === 'string') {
		returnArray = [
			{
				name: 'Export',
				from: { table: data },
				fixValue: extractTextFromHTML
			}
		]
	} else {
		returnArray = [
			{
				name: 'Export',
				from: { array: data },
				fixValue: removeNanValues
			}
		]
	}

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
			className="dd-option"
			onClick={() => {
				download(type)
			}}
		>
			{title}
		</div>
	)
}
