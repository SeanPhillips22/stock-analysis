import { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { actionsState } from 'state/actionsState'
import { Dropdown } from 'components/Dropdown/_Dropdown'

interface Props {
	setColumnFilter: (columId: string, updater: any) => void
}

export default function SplitsFilter({ setColumnFilter }: Props) {
	const [title, setTitle] = useState('All Splits')
	const setIsFiltered = actionsState(state => state.setIsFiltered)

	useEffect(() => {
		return () => {
			setIsFiltered(false)
		}
	}, [setIsFiltered])

	return (
		<Dropdown title={title}>
			<Popover.Button as="div">
				<div
					className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					onClick={() => {
						setColumnFilter('splitType', '')
						setTitle('All Splits')
						setIsFiltered(false)
					}}
					tabIndex={0}
				>
					All Splits
				</div>
			</Popover.Button>
			<Popover.Button as="div">
				<div
					className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					onClick={() => {
						setColumnFilter('splitType', 'Forward')
						setTitle('Forward')
						setIsFiltered(true)
					}}
					tabIndex={0}
				>
					Forward Splits
				</div>
			</Popover.Button>
			<Popover.Button as="div">
				<div
					className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					onClick={() => {
						setColumnFilter('splitType', 'Reverse')
						setTitle('Reverse')
						setIsFiltered(true)
					}}
					tabIndex={0}
				>
					Reverse Splits
				</div>
			</Popover.Button>
		</Dropdown>
	)
}
