import { screenerState } from 'components/StockScreener/screener.state'
import { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { ColumnItemWrap } from './ColumnItemWrap'
import { ColumnSearch } from './ColumnSearch'
import { ScreenerTypes } from 'components/StockScreener/screener.types'
import { classNames } from 'functions/helpers/classNames'

/**
 * The custom columns dropdown. It contains a search filter and checkbox for each column.
 * @return {JSX.Element}
 */

type Props = {
	type: ScreenerTypes
}

export function ColumnDropdown({ type }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const [search, setSearch] = useState('')

	const open = screenerState((state) => state.columnDropdownOpen)
	const setOpen = screenerState((state) => state.setColumnDropdownOpen)

	// Close dropdown if clicked outside of it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false)
				document.removeEventListener('mousedown', handleClickOutside)
			}
		}

		if (open) {
			document.addEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [open, setOpen])

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') setOpen(true)
		if (event.key === 'Escape') setOpen(false)
	}

	return (
		<div ref={ref} className="columns-wrap">
			<div
				className="columns-button"
				onClick={() => setOpen(!open)}
				onKeyDown={handleKeyDown}
				tabIndex={0}
			>
				Columns
				<ChevronDownIcon className="columns-icon" aria-hidden="true" />
			</div>

			<div className={classNames('columns-dropdown', open ? 'active' : '')}>
				<ColumnSearch search={search} setSearch={setSearch} />
				<ColumnItemWrap search={search} type={type} />
			</div>
		</div>
	)
}
