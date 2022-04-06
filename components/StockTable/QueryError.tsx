import { ErrorIcon } from 'components/Icons/Error'
import { useEvent } from 'hooks/useEvent'
import { TableDynamic } from './TableTypes'

type Props = {
	error: any
	dynamic: TableDynamic
	clearState: () => void
}

export function QueryError({ error, dynamic, clearState }: Props) {
	const { event } = useEvent()

	// Log a "SoftError" event for further debugging
	event('SoftError')

	// Stringify the dynamic props for debugging
	let dynamicStr = JSON.stringify(dynamic)

	// Reset the table state so it will work on next refresh
	clearState()

	return (
		<div className="my-5">
			<div className="border-l-4 border-red-400 bg-red-50 p-4 text-red-700">
				<div className="flex flex-row items-center">
					<div className="shrink-0">
						<ErrorIcon />
					</div>
					<div className="ml-3 sm:ml-4">
						<div className="text-base">
							There was an error so the table settings have been reset. Please refresh the page and try again.
						</div>
						<div className="mt-4 text-base text-gray-600">Error: {error.message}</div>
					</div>
				</div>
			</div>
			{dynamicStr && <div className="mt-2 text-xs text-gray-600">Debug: {dynamicStr}</div>}
		</div>
	)
}
