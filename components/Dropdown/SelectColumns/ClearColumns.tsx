import { CloseCircleIcon } from 'components/Icons/CloseCircle'

export function ClearColumns({ clear }: { clear: () => void }) {
	return (
		<div
			className="flex items-center border-t border-gray-300 cursor-pointer py-1 px-2 text-sm font-semibold text-gray-600 hover:text-red-600"
			onClick={() => clear()}
			title="Reset selected columns"
		>
			<CloseCircleIcon classes="w-4 h-4 mr-1" />
			Reset columns
		</div>
	)
}
