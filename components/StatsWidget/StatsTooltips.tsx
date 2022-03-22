import { FinancialsMapType } from 'types/Financials'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import styles from './StatsWidget.module.css'

const TooltipContent = ({ data }: { data?: FinancialsMapType }) => {
	if (!data) {
		return <></>
	}
	return (
		<div>
			<h4 className="mb-2 text-xl font-semibold">{data.title}</h4>
			<div className="border-t border-gray-300 pt-2">{data.tooltip}</div>
			{data.formula && <div className="mt-3 border-t border-gray-300 pt-2 text-sm">{data.formula}</div>}
		</div>
	)
}

interface Props {
	data?: FinancialsMapType
	indicator: string
}

export const Tooltip = ({ data, indicator }: Props) => {
	return (
		<Tippy
			theme="light"
			delay={100}
			className={styles.bigTooltipText}
			interactive={true}
			content={<TooltipContent data={data} />}
		>
			<span>{indicator}</span>
		</Tippy>
	)
}
