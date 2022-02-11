import { CheckIcon } from 'components/Icons/CheckIcon'
import { Dropdown } from 'components/Dropdown/_Dropdown'
import { cn } from 'functions/helpers/classNames'
import { tabActive } from 'functions/helpers/tabActive'
import { useTableContext } from '../TableContext'

const OPTIONS: {
	sort: 'desc' | 'asc'
	long: string
}[] = [
	{
		sort: 'desc',
		long: 'Gainers'
	},
	{
		sort: 'asc',
		long: 'Losers'
	}
]

/**
 * Dropdown to select the type of mover to show in the table
 */
export function TableMoverType() {
	const { dynamic, setState } = useTableContext()
	const { sortDirection } = dynamic

	// when a new count is selected, either update the state or redirect to Pro page
	function handleClick(sort: 'desc' | 'asc') {
		setState({ sortDirection: sort })
	}

	// the text on the dropdown option
	function getLabel(sort: 'desc' | 'asc') {
		return OPTIONS.find(i => i.sort === sort)?.long
	}

	return (
		<Dropdown
			title={getLabel(sortDirection) || 'Range'}
			hoverTitle="Change mover type"
			classes="dd-right"
		>
			{OPTIONS.map(i => (
				/* One Dropdown Item */
				<div
					key={i.sort}
					className={cn('dd-option', tabActive(i.sort, sortDirection))}
					title={i.long}
					onClick={() => handleClick(i.sort)}
				>
					{/* Button Text */}
					{i.long}

					{/* Icon - if option selected */}
					{i.sort === sortDirection && (
						<CheckIcon className="h-5 w-5" aria-hidden="true" />
					)}
				</div>
			))}
		</Dropdown>
	)
}
