import { screenerState } from '../screener.state'
import { CloseCircleIcon } from 'components/Icons/CloseCircle'
import { cn } from 'functions/helpers/classNames'

type Props = {
	showLabel?: boolean
}

export function ClearFiltersButton({ showLabel }: Props) {
	const clearFilters = screenerState(state => state.clearFilters)

	return (
		<>
			<div className="flex items-center justify-center sm:justify-start">
				<div
					className={cn(
						showLabel ? 'pt-2 sm:pt-0' : '',
						'flex items-center text-gray-500 hover:text-red-500 cursor-pointer font-semibold text-base'
					)}
					title="Clear All Filters"
					onClick={() => clearFilters()}
					onKeyPress={e => e.key === 'Enter' && clearFilters()}
					tabIndex={0}
				>
					<CloseCircleIcon
						classes={cn(showLabel ? '' : 'ml-1.5', 'w-5 h-5 sm:ml-1')}
					/>
					{showLabel && (
						<div className="ml-[1.5px] sm:ml-0.5">Clear All Filters</div>
					)}
				</div>
			</div>
		</>
	)
}
