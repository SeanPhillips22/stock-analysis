import { ArrowSmDownIcon } from 'components/Icons/ArrowSmDown'
import { ArrowSmUpIcon } from 'components/Icons/ArrowSmUp'

export function UpDownIcons({ color }: { color?: 'red' | 'green' }) {
	if (color === 'red') {
		return <ArrowSmDownIcon classes="mcdownicon" aria-hidden="true" />
	}

	return <ArrowSmUpIcon classes="mcupicon" aria-hidden="true" />
}
