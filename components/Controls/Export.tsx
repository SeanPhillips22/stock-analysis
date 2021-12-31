import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ExportItem } from './Export/ExportItem'
import { ExportItemRestricted } from './Export/ExportItemRestricted'
import { useAuthState } from 'hooks/useAuthState'

type Button = {
	title: string
	type: 'csv' | 'xlsx'
	restricted: boolean
	active?: boolean
}

type Props = {
	buttons: Button[]
	tableId: string
	fileName?: string
}

export function Export({ buttons, tableId, fileName }: Props) {
	const { isPro } = useAuthState()

	return (
		<Menu as="div" className="export">
			<Menu.Button className="controls-btn">
				Export
				<ChevronDownIcon className="export-icon" aria-hidden="true" />
			</Menu.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="export-dropdown">
					{buttons &&
						buttons.map((button, index) =>
							button.restricted && !isPro ? (
								<ExportItemRestricted
									key={index}
									title={button.title}
									type={button.type}
								/>
							) : (
								<ExportItem
									key={index}
									title={button.title}
									type={button.type}
									data={tableId}
									fileName={fileName}
								/>
							)
						)}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
