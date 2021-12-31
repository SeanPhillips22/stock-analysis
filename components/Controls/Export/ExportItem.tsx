import { Menu } from '@headlessui/react'
import dynamic from 'next/dynamic'

const Download = dynamic(() => import('./Download'), {
	ssr: false
})

type ExportItemProps = {
	title: string
	type: 'csv' | 'xlsx'
	data: string | any[]
	fileName?: string
}

export const ExportItem = ({
	title,
	type,
	data,
	fileName
}: ExportItemProps) => (
	<Menu.Item>
		<Download title={title} type={type} data={data} fileName={fileName} />
	</Menu.Item>
)
