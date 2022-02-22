import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from 'components/Icons/CheckIcon'
import { SelectorIcon } from 'components/Icons/SelectorIcon'

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

function getName(selected: number | string, selectOptions: SelectOption[]) {
	const found = selectOptions.find(item => item.value === selected)
	return found?.name
}

type SelectOption = {
	value: string | number
	name: string | number
}

type Props = {
	selected: number | string
	setSelected: any
	selectOptions: SelectOption[]
}

export function DropdownSelect({
	selected,
	setSelected,
	selectOptions
}: Props) {
	return (
		<Listbox value={selected} onChange={setSelected}>
			<div>
				<Listbox.Button className="relative max-w-[130px] cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-2 pr-8 text-left text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bp:pl-3 bp:pr-10 sm:text-base">
					<span className="block truncate">
						{getName(selected, selectOptions)}
					</span>
					<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1 bp:pr-2">
						<SelectorIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</span>
				</Listbox.Button>

				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<Listbox.Options className="absolute z-10 mt-1 max-h-60 max-w-[130px] overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
						{selectOptions.map(option => (
							<Listbox.Option
								key={option.value}
								className={({ active }) =>
									classNames(
										active ? 'bg-gray-200' : '',
										'relative cursor-pointer select-none py-2 pl-3 pr-9 text-gray-700'
									)
								}
								value={option.value}
							>
								{({ selected }) => (
									<>
										<span
											className={classNames(
												selected ? 'font-semibold' : 'font-normal',
												'block truncate'
											)}
										>
											{option.name}
										</span>

										{selected ? (
											<span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
												<CheckIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</span>
										) : null}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	)
}
