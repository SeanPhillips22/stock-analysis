import { Tooltip } from './Tooltip'
import { DEFINITIONS } from './DEFINITIONS'
import { InfoIcon } from 'components/Icons/Info'

export function Definition({ id }: { id: string }) {
	const data = DEFINITIONS.find(item => item.id === id)
	if (!data) return null

	const Content = () => (
		<div className="def">
			<h4>{data.title}</h4>
			<div className="def-text">{data.tooltip}</div>
			{data.formula && <div className="def-formula">{data.formula}</div>}
		</div>
	)

	return (
		<span className="relative">
			<Tooltip
				content={<Content />}
				theme="light"
				delay={200}
				interactive={true}
				popperOptions={{
					strategy: 'fixed'
				}}
			>
				<span className="def-icon">
					<InfoIcon classes="w-2 h-2" />
				</span>
			</Tooltip>
		</span>
	)
}
