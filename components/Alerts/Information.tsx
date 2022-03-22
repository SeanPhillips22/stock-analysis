import { InformationCircleIcon } from 'components/Icons/InformationCircle'

interface Props {
	message: string
	classes?: string
}

export const Information = ({ message, classes }: Props) => {
	let css = 'bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-700'
	if (classes) css += ` ${classes}`

	return (
		<div className={css}>
			<div className="flex flex-row items-center">
				<div className={message.length > 100 ? 'hidden shrink-0 sm:block' : 'shrink-0'}>
					<InformationCircleIcon classes="h-5 w-5 text-blue-400" aria-hidden="true" />
				</div>
				<div className={message.length > 100 ? 'ml-0 sm:ml-4' : 'ml-3 sm:ml-4'}>
					<span>{message}</span>
				</div>
			</div>
		</div>
	)
}
