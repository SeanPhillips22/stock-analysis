import { TableTitle } from './Controls/TableTitle'

type Props = {
	title: string
	text: string
}

/**
 * Display a fallback message if the stock table is not available.
 */
export function Fallback({ title, text }: Props) {
	return (
		<div className="controls fallback">
			<TableTitle title={title} />
			<p>{text}</p>
		</div>
	)
}
