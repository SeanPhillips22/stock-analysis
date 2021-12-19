type Props = {
	classes: string
}

export function NavArrowIcon({ classes }: Props) {
	return (
		<svg
			className={classes}
			viewBox="0 0 20 20"
			aria-hidden="true"
			style={{ maxWidth: '20px' }}
		>
			<path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
		</svg>
	)
}
