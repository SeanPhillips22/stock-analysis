import { ConsensusChart } from './ConsensusChart'
import { ConsensusSummary } from './ConsensusSummary'
import { PriceTargetChart } from './PriceTargetChart'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'
import styles from './PriceTarget.module.css'
import { useSymbolContext } from 'components/Layout/SymbolContext'

export function PriceTarget() {
	const { data } = useSymbolContext()

	return (
		<>
			<div className={styles.pt}>
				<div className={styles.ptleft}>
					<h2>Stock Price Forecast</h2>
					<Snippet />
					<ConsensusChart />
					<ConsensusSummary />
				</div>
				<div className={styles.ptchart}>
					{data.targets.chart && <PriceTargetChart />}
					<SummaryTable />
				</div>
			</div>
		</>
	)
}
