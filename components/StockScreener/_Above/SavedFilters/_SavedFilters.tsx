import { screenerState } from 'components/StockScreener/screener.state'
import { ChevronDownIcon } from 'components/Icons/ChevronDownIcon'
import { useState, useRef, useEffect } from 'react'
import { SavedDropdown } from './SavedDropdown'

export function SavedFilters() {
	const type = screenerState(state => state.type)
	const [open, setOpen] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') setOpen(true)
		if (event.key === 'Escape') setOpen(false)
	}

	// Close dropdown if clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false)
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false)
				document.removeEventListener('keydown', handleEscape)
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [open, setOpen])

	return (
		<div className="flex-grow">
			<label
				htmlFor="location"
				className="hidden text-sm font-medium text-gray-700 md:block"
			>
				Saved Screens
			</label>
			<div ref={ref} className="relative">
				<div
					className="inline-flex w-full cursor-pointer justify-between whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-0 bp:px-4 md:justify-center"
					onClick={() => setOpen(!open)}
					onKeyDown={handleKeyDown}
					tabIndex={0}
				>
					Select saved
					<ChevronDownIcon
						className="-mr-1 ml-2 h-5 w-5"
						aria-hidden="true"
					/>
				</div>

				<div
					className={`absolute right-2 z-50 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-150 focus:outline-none lg:absolute lg:right-0 w-[260px]${
						open
							? ' visible translate-y-0 transform opacity-100'
							: ' invisible -translate-y-2 transform opacity-0'
					}`}
				>
					<SavedDropdown type={type} />
				</div>
			</div>
		</div>
	)
}
