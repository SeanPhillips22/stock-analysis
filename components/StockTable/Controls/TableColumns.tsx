import { ChevronDownIcon } from '@heroicons/react/solid'
import { useRef } from 'react'

export function TableColumns() {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div ref={ref} className="columns-wrap">
			{/* Columns Button */}
			<div className="columns-button">
				Columns
				<ChevronDownIcon className="columns-icon" aria-hidden="true" />
			</div>

			{/* Columns Dropdown */}
			<div className="columns-dropdown"></div>
		</div>
	)
}
