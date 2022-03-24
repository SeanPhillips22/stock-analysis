import { InformationCircleIcon } from 'components/Icons/InformationCircle'
import { cn } from 'functions/helpers/classNames'

type Props = {
	text: string
	smallText?: boolean
	classes?: string
}

export function InfoBox({ text, smallText, classes }: Props) {
	return (
		<div className={cn('rounded border border-gray-300 bg-white p-3 sm:p-4', classes ? classes : '')}>
			<div className="flex-row items-center sm:flex sm:space-x-4">
				<div className="float-left mr-1 shrink-0 sm:mr-0 sm:block">
					<InformationCircleIcon classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
				</div>
				<div className="flex-1 sm:ml-3 md:flex md:justify-between">
					<p className={cn('text-gray-900', smallText ? 'text-base' : 'text-base md:text-lg')}>{text}</p>
				</div>
			</div>
		</div>
	)
}
