import React, { CSSProperties } from 'react'

type MiniChartLineProps = {
	data: number[]
	points: Array<{ x: number; y: number }>
	margin: number
	height: number
	color: string
	style: CSSProperties
	onMouseMove: any
}

export function MiniChartLine({ data, points, height, margin, color, style, onMouseMove }: MiniChartLineProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	const linePoints = points.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))

	const closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y]

	let fillPoints = linePoints.concat(closePolyPoints)

	const lineStyle: CSSProperties = {
		stroke: color || style.stroke || 'none',
		strokeWidth: style.strokeWidth || '1',
		strokeLinejoin: style.strokeLinejoin || 'round',
		strokeLinecap: style.strokeLinecap || 'round',
		fill: 'none'
	}
	const fillStyle: CSSProperties = {
		stroke: style.stroke || 'none',
		strokeWidth: '0',
		fillOpacity: style.fillOpacity || '.1',
		fill: style.fill || color || 'none'
	}

	const tooltips = points.map((p, i) => {
		return (
			<circle
				key={i}
				cx={p.x}
				cy={p.y}
				r={2}
				//	@ts-ignore
				style={fillStyle}
				onMouseEnter={() => onMouseMove('enter', data[i], p)}
				onClick={() => onMouseMove('click', data[i], p)}
			/>
		)
	})

	return (
		//	@ts-ignore
		<g>
			{tooltips}
			<polyline points={fillPoints.join(' ')} style={fillStyle} />
			<polyline points={linePoints.join(' ')} style={lineStyle} />
		</g>
	)
}
