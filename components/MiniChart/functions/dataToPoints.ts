import { minimum } from './min'
import { maximum } from './max'

type dataSettings = {
	data: Array<number>
	limit: number
	width: number
	height: number
	margin: number
}

export function dataToPoints({ data, limit, width = 1, height = 1, margin = 0 }: dataSettings) {
	const len = data.length
	const max = maximum(data)
	const min = minimum(data)
	if (limit && limit < len) {
		data = data.slice(len - limit)
	}

	const vfactor = (height - margin * 2) / (max - min || 2)
	const hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0))

	return data.map((d, i) => ({
		x: i * hfactor + margin,
		y: (max === min ? 1 : max - d) * vfactor + margin
	}))
}
