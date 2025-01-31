export const DotsVerticalIcon = ({ classes }: { classes: string }) => {
	return (
		<svg
			className={classes}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2}
			style={{ maxWidth: '40px' }}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
			/>
		</svg>
	)
}
