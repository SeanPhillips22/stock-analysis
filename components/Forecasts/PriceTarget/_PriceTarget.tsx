import { ConsensusChart } from './ConsensusChart'
import { ConsensusSummary } from './ConsensusSummary'
import { PriceTargetChart } from './PriceTargetChart'
import { Snippet } from './Snippet'
import { SummaryTable } from './SummaryTable'
import styles from './PriceTarget.module.css'

export function PriceTarget() {
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
					<PriceTargetChart />
					<SummaryTable />
				</div>
			</div>
		</>
	)
}
