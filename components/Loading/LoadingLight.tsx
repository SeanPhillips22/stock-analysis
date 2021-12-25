import { Transition } from '@headlessui/react'
import { useState, useEffect } from 'react'

export function LoadingLight() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const to = setTimeout(() => setShow(true), 300)

		return () => clearTimeout(to)
	}, [])

	return (
		<Transition
			show={show}
			enter="bg-white transition ease-in duration-1000"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="bg-gray-500 transition ease-out duration-75"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
			className="w-full h-full flex justify-center items-center bg-gray-50"
		>
			<svg
				className="animate-spin h-12 w-12 text-blue-300"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				></circle>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
		</Transition>
	)
}
