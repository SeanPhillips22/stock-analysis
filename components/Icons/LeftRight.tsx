interface IProps {
	classes: string
}

export const LeftRightIcon = ({ classes }: IProps) => (
	<svg
		className={classes}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		style={{ maxWidth: '40px' }}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
		/>
	</svg>
)
