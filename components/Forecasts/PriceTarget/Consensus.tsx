import { useSymbolContext } from 'components/Layout/SymbolContext'

export function Consensus() {
	const { data } = useSymbolContext()

	return (
		<div className="text-center text-xl font-semibold">
			Analyst Consensus:{' '}
			<span className="font-bold text-green-800">
				{data.recommendations[0].consensus}
			</span>
		</div>
	)
}
