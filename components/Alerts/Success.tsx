import { SuccessIcon } from 'components/Icons/Success'

interface Props {
	message: string
}

export const Success = ({ message }: Props) => (
	<div className="my-5">
		<div className="border-l-4 border-green-400 bg-green-50 p-4 text-green-700">
			<div className="flex flex-row items-center">
				<div className="shrink-0">
					<SuccessIcon />
				</div>
				<div className="ml-3 sm:ml-4">
					<span className="text-base">{message}</span>
				</div>
			</div>
		</div>
	</div>
)
