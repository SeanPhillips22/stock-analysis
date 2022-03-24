import { InformationCircleIcon } from 'components/Icons/InformationCircle'
import { cn } from 'functions/helpers/classNames'

type Props = {
	text: string
	classes?: string
}

export function SmallInfoBox({ text, classes }: Props) {
	return (
		<div className={cn('rounded border border-gray-300 bg-white p-2.5 xs:p-3', classes ? classes : '')}>
			<div className="md:flex md:flex-row md:items-center md:space-x-2.5">
				<div className="float-left mr-1 md:mr-0 md:block">
					<InformationCircleIcon classes="h-4 xs:h-5 md:h-5 w-4 xs:w-5 md:w-5 text-blue-400 mt-0.5 md:mt-0" />
				</div>
				<div>
					<p className="text-smaller text-gray-900 xs:text-base">{text}</p>
				</div>
			</div>
		</div>
	)
}
