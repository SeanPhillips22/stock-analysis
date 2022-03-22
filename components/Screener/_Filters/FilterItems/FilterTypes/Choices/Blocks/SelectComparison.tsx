import { Dispatch, Fragment, SetStateAction } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { ComparisonOption } from 'components/Screener/screener.types'
import { capitalize } from 'functions/helpers/capitalize'
import { cn } from 'functions/helpers/classNames'

const options = ['over', 'under', 'between', 'exactly', 'notzero']

type Props = {
	compare: ComparisonOption
	setCompare: Dispatch<SetStateAction<ComparisonOption>>
}

/**
 * Screener component that enables selection of over/under/between/etc in a numeric filter
 */
export function SelectComparison({ compare, setCompare }: Props) {
	return (
		<Listbox value={compare} onChange={setCompare}>
			{({ open }) => (
				<>
					<div className="relative">
						<Listbox.Button className="relative w-full cursor-pointer py-2 pl-2 pr-7 text-left text-smaller font-semibold text-gray-800 focus:outline-none focus:ring-0">
							<span className="block truncate">{compare === 'notzero' ? 'Not Zero' : capitalize(compare)}</span>
							<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
								<ChevronDownIcon className="h-5 w-5 text-gray-700" aria-hidden="true" />
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-[6rem] overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{options.map(option => (
									<Listbox.Option
										key={option}
										className={({ active }) =>
											cn(
												'relative cursor-pointer select-none py-2 pl-2 pr-4 text-gray-900',
												active ? 'bg-gray-100' : ''
											)
										}
										value={option}
									>
										{({ selected }) => (
											<>
												<span className={cn('block truncate', selected ? 'font-semibold' : 'font-normal')}>
													{option === 'notzero' ? 'Not Zero' : capitalize(option)}
												</span>
											</>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	)
}
