import { WarningIcon } from 'components/Icons/Warning'

interface Props {
	message: string
}

export const Warning = ({ message }: Props) => (
	<div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-700">
		<div className="flex flex-row items-center">
			<div className="shrink-0">
				<WarningIcon />
			</div>
			<div className="ml-3 sm:ml-4">
				<span className="text-base">{message}</span>
			</div>
		</div>
	</div>
)
