import { Fragment, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ExportItem } from 'components/Controls/Export/ExportItem'
import { ExportItemRestricted } from 'components/Controls/Export/ExportItemRestricted'
import { useAuthState } from 'auth/useAuthState'
import { useState } from 'react'

type Button = {
	title: string
	type: 'csv' | 'xlsx'
	restricted: boolean
	active?: boolean
}

type Props = {
	buttons: Button[]
	data: any
	setData: any
	time: string | null
}

export function Export({ buttons, data, time }: Props) {
	const { isPro } = useAuthState()
	const [expData, setExpData] = useState<any[]>(['Date', 'Open', 'Close', 'High', 'Low', 'Volume'])

	useEffect(() => {
		const result: any[] = []
		if (typeof data !== 'undefined' && !Array.isArray(data[0])) {
			if (time == '1D' || time == '5D') {
				result.push(['Date', 'Open', 'Close', 'High', 'Low', 'Volume'])
			} else {
				result.push(['Date', 'Open', 'Close', 'High', 'Low', 'Volume', 'MA1', 'MA2'])
			}

			for (let i = 0; i < data.length; i++) {
				let arr = []
				if (time == '1D' || time == '5D') {
					const dateString =
						data[i].date.getMonth() +
						1 +
						'/' +
						data[i].date.getDate() +
						'/' +
						data[i].date.getFullYear().toString().substr(-2) +
						' ' +
						data[i].date.getHours() +
						':' +
						data[i].date.getMinutes()
					arr = [dateString, data[i].open, data[i].close, data[i].high, data[i].low, data[i].volume]
				} else {
					arr = [
						data[i].date,
						data[i].open,
						data[i].close,
						data[i].high,
						data[i].low,
						data[i].volume,
						data[i].ma1,
						data[i].ma2
					]
				}
				result.push(arr)
			}
			setExpData(result)
		}
	}, [data, setExpData, time])

	return (
		<Popover as="div" className="relative z-10 hidden text-left sm:inline-block">
			<Popover.Button className="relative inline-flex items-center border-l border-gray-300 py-2 pl-4 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 bp:pr-2 bp:text-base md:border-r-0">
				Export
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-8 text-gray-500"
					fill="none"
					viewBox="0 0 20 20"
					stroke="currentColor"
					style={{ maxWidth: '40px' }}
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 8l4 4 4-4" />
				</svg>
			</Popover.Button>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<Popover.Panel className="absolute right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5  focus:outline-none ">
					<div className="py-1">
						{buttons &&
							buttons.map((button, index) =>
								button.restricted && !isPro ? (
									<ExportItemRestricted key={index} title={button.title} type={button.type} />
								) : (
									<ExportItem key={index} title={button.title} type={button.type} data={expData} />
								)
							)}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	)
}
