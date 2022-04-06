import PropTypes from 'prop-types'
import React from 'react'

export default class SparklinesLine extends React.Component {
	static propTypes = {
		color: PropTypes.string,
		style: PropTypes.object
	}

	static defaultProps = {
		style: {},
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onMouseMove: () => {}
	}

	render() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { data, points, width, height, margin, color, style, onMouseMove } = this.props

		const linePoints = points.map(p => [p.x, p.y]).reduce((a, b) => a.concat(b))

		const closePolyPoints = [
			points[points.length - 1].x,
			height - margin,
			margin,
			height - margin,
			margin,
			points[0].y
		]

		let fillPoints = linePoints.concat(closePolyPoints)

		const lineStyle = {
			stroke: color || style.stroke || 'none',
			strokeWidth: style.strokeWidth || '1',
			strokeLinejoin: style.strokeLinejoin || 'round',
			strokeLinecap: style.strokeLinecap || 'round',
			fill: 'none'
		}
		const fillStyle = {
			stroke: style.stroke || 'none',
			strokeWidth: '0',
			fillOpacity: style.fillOpacity || '.1',
			fill: style.fill || color || 'none',
			pointerEvents: 'none'
		}

		const tooltips = points.map((p, i) => {
			return (
				<circle
					key={i}
					cx={p.x}
					cy={p.y}
					r={2}
					style={fillStyle}
					onMouseEnter={() => onMouseMove('enter', data[i], p)}
					onClick={() => onMouseMove('click', data[i], p)}
				/>
			)
		})

		return (
			<g>
				{tooltips}
				<polyline points={fillPoints.join(' ')} style={fillStyle} />
				<polyline points={linePoints.join(' ')} style={lineStyle} />
			</g>
		)
	}
}
