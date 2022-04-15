import { Info } from 'types/Info'
import { Title } from 'components/StockHeading/Title'
import { StockQuote } from 'components/StockQuote/_StockQuote'
import { TabNavigation } from 'components/StockHeading/TabNavigation'
import { TabNavigationETF } from 'components/StockHeading/TabNavigationETF'

export default function StockHeading({ info }: { info: Info }) {
	return (
		<div className="mx-auto mb-2 px-3 xs:px-4 lg:px-6">
			<Title info={info} />
			<StockQuote info={info} />
			{info.type === 'stocks' ? (
				<TabNavigation info={info} hideChart={info.exceptions.hideChart} />
			) : (
				<TabNavigationETF symbol={info.symbol} />
			)}
		</div>
	)
}
