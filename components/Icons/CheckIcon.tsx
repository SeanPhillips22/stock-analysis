export function CheckIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={props.className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			style={{ maxWidth: '40px' }}
		>
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
		</svg>
	)
}
