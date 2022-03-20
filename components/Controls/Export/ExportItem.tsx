import dynamic from 'next/dynamic'

const Download = dynamic(() => import('./Download'), {
	ssr: false
})

type ExportItemProps = {
	title: string
	type: 'csv' | 'xlsx'
	tableId?: string
	data?: any[]
	fileName?: string
	bulkData?: string
}

export function ExportItem({ title, type, tableId, data, fileName, bulkData }: ExportItemProps) {
	return <Download title={title} type={type} tableId={tableId} data={data} fileName={fileName} bulkData={bulkData} />
}
