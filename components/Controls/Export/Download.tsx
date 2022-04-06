import ExcellentExport from 'excellentexport'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { extractFinancialValues, extractTextFromHTML, removeNanValues } from './export.functions'
import { Menu } from '@headlessui/react'
import { useEvent } from 'hooks/useEvent'

interface Props {
	title: string
	type: 'csv' | 'xlsx'
	data: any
	tableId?: string
	fileName?: string
	bulkData?: any
}

export default function Download({ title, type, data, tableId, fileName, bulkData }: Props) {
	const { path } = useLayoutContext()
	const { event } = useEvent()

	let name = fileName ? fileName : `${path.one}${path.two ? '-' + path.two : ''}${path.three ? '-' + path.three : ''}`

	let returnArray: any[] = []

	//* Bulk Export
	if (bulkData) {
		returnArray = bulkData
		name = `${path.two}-financials`
	}

	//* Array export
	else if (data) {
		returnArray = [
			{
				name: 'Export',
				from: { array: data },
				fixValue: removeNanValues
			}
		]
	}

	//* Table Export
	else if (tableId) {
		let isFinancial = tableId === 'financial-table'
		returnArray = [
			{
				name: isFinancial ? path.two?.toUpperCase() : 'Export',
				from: { table: tableId },
				fixValue: isFinancial ? extractFinancialValues : extractTextFromHTML
			}
		]
	}

	function download(type: 'csv' | 'xlsx') {
		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: name,
				format: type
			},
			returnArray
		)
	}

	return (
		<Menu.Item>
			<div
				className="dd"
				onClick={() => {
					event('Pro_Export', { type: title })
					download(type)
				}}
			>
				{title}
			</div>
		</Menu.Item>
	)
}
