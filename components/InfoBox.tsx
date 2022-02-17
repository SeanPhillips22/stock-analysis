import { InformationCircleIcon } from 'components/Icons/InformationCircle'

interface Props {
	text: string
}

export const InfoBox = ({ text }: Props) => {
	return (
		<div className="rounded border border-gray-300 bg-white p-3 sm:p-4">
			<div className="flex-row items-center sm:flex sm:space-x-4">
				<div className="float-left mr-1 shrink-0 sm:mr-0 sm:block">
					<InformationCircleIcon classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
				</div>
				<div className="flex-1 sm:ml-3 md:flex md:justify-between">
					<p className="text-base text-gray-900 md:text-lg">{text}</p>
				</div>
			</div>
		</div>
	)
}
