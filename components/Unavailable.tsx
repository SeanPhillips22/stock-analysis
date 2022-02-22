interface props {
	message: string
	small?: boolean
	classes?: string
}

export function Unavailable({ message, small, classes }: props) {
	let css =
		'flex h-full items-center justify-center border border-gray-200 bg-gray-50 p-6 text-center md:p-12 font-semibold rounded-sm'
	css += small ? ' text-lg md:text-xl' : ' text-xl md:text-2xl'
	css += classes ? ' ' + classes : ''

	return <div className={css}>{message}</div>
}

export function isOldSafari() {
	return (
		typeof window !== 'undefined' &&
		typeof window.ResizeObserver === 'undefined'
	)
}

export function UnavailableSafari({ classes }: { classes?: string }) {
	return (
		<Unavailable
			message="This chart does not work in your browser. Please update to the latest browser version."
			small={true}
			classes={classes}
		/>
	)
}
