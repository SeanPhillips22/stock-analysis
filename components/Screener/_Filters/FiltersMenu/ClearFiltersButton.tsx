import { CloseCircleIcon } from 'components/Icons/CloseCircle'
import { cn } from 'functions/helpers/classNames'
import { useScreenerContext } from 'components/Screener/ScreenerContext'

type Props = {
	showLabel?: boolean
}

export function ClearFiltersButton({ showLabel }: Props) {
	const { dispatch } = useScreenerContext()

	return (
		<>
			<div className="flex items-center justify-center sm:justify-start">
				<div
					className={cn(
						showLabel ? 'pt-2 sm:py-2' : '',
						'flex cursor-pointer items-center text-base font-semibold text-gray-500 hover:text-red-500'
					)}
					title="Clear All Filters"
					onClick={() => dispatch({ type: 'CLEAR_FILTERS', value: null })}
					onKeyPress={e => e.key === 'Enter' && dispatch({ type: 'CLEAR_FILTERS', value: null })}
					tabIndex={0}
				>
					<CloseCircleIcon classes={cn(showLabel ? '' : 'ml-1.5', 'w-5 h-5 sm:ml-1')} />
					{showLabel && <div className="ml-0.5">Clear All Filters</div>}
				</div>
			</div>
		</>
	)
}
