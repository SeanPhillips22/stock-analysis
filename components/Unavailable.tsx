interface props {
	message: string
	small?: boolean
	classes?: string
}

export function Unavailable({ message, small, classes }: props) {
	return (
		<div
			className={`flex h-full items-center justify-center border border-gray-200 bg-gray-50 p-6 text-center md:p-12 ${
				small ? 'text-lg md:text-xl' : 'text-xl md:text-2xl'
			} font-semibold rounded-sm${classes ? ' ' + classes : ''}`}
		>
			{message}
		</div>
	)
}
