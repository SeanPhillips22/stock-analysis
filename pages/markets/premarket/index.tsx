import { GetStaticProps } from 'next/types'
import { StockTable } from 'components/StockTable/__StockTable'
import { MarketsLayout } from 'components/Markets/_MarketsLayout'
import { PageConfig } from 'types/PageConfig'
import { getSelect } from 'functions/apis/getSelect'
import { TableTimestamp } from 'types/Tables'
import { PageContextProvider } from 'components/Markets/PageContext'
import { TableContextProvider } from 'components/StockTable/TableContext'
import { TableData, TableDynamic } from 'components/StockTable/TableTypes'
import { MoverDataPoints } from 'data/DataPointGroups/MoverDataPoints'
import { PremarketNav } from 'components/Markets/Navigation/PremarketNav'
// import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines'
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'components/Sparklines/Sparklines'
import { spy, qqq, ivm } from 'components/Sparklines/testdata'

// the page's config and settings
const page: PageConfig = {
	path: '/markets/premarket/',
	metaTitle: "Today's Premarket Stock Movers",
	metaDescription:
		'Stocks that are moving in the premarket trading period from 4:00 AM to 9:30 AM. See top gainers and top losers.'
}

// the initial config for the select endpoint to fetch data
const queryGainers: TableDynamic = {
	index: 'stocks',
	main: 'premarketChangePercent',
	count: 10,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'desc',
	columns: ['rank', 's', 'n', 'premarketChangePercent', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['premarketChangePercent-over-0', 'price-over-1', 'close-over-1', 'marketCap-over-1000000']
}

const queryLosers: TableDynamic = {
	index: 'stocks',
	main: 'premarketChangePercent',
	count: 10,
	sort: [{ id: 'premarketChangePercent', desc: true }],
	sortDirection: 'asc',
	columns: ['rank', 's', 'n', 'premarketChangePercent', 'premarketChange', 'premarketPrice', 'marketCap'],
	filters: ['premarketChangePercent-under-0', 'price-over-1', 'close-over-1', 'marketCap-over-1000000']
}

type Props = {
	res: {
		data: TableData
		tradingTimestamps: TableTimestamp
	}
	losers: {
		data: TableData
	}
}

export default function PreMarket(props: Props) {
	const redOrGreen = (value: number, prevClose: number) => {
		if (value > prevClose) return 'green'
		return 'red'
	}

	// const getNthItems = <T,>(arr: T[], nth: number): T[] => arr.filter((_, i) => i % nth === nth - 1) If we want to get every nth and shorten data.

	const dataArray = [
		{ data: spy, prevClose: 456 },
		{ data: qqq, prevClose: 369 },
		{ data: ivm, prevClose: 208.5 }
	]

	const returnCloseData = (list: any) => {
		return list.map((item: any) => {
			return item.close
		})
	}

	return (
		<PageContextProvider value={{ page, updated: props.res.tradingTimestamps }}>
			<MarketsLayout SubNav={PremarketNav}>
				<div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7">
					<dl className=" grid grid-cols-1  md:grid-cols-3 ">
						{' '}
						{dataArray.map((object: any, i: number) => (
							<div className="w-36" key={i}>
								<Sparklines previousClose={object.prevClose} data={returnCloseData(object.data.values)}>
									<SparklinesLine
										color={redOrGreen(
											Number(object.data.values[object.data.values.length - 1].close),
											object.prevClose
										)}
										style={{
											strokeWidth: '2',
											fill: redOrGreen(
												Number(object.data.values[object.data.values.length - 1].close),
												object.prevClose
											),
											fillOpacity: '.2'
										}}
									/>
									<SparklinesReferenceLine
										style={{ stroke: 'black', strokeOpacity: 1, strokeWidth: '2', strokeDasharray: '4, 5' }}
										type={'custom'}
										value={1}
									/>
								</Sparklines>
							</div>
						))}
					</dl>
					<TableContextProvider
						value={{
							title: 'Premarket Gainers',
							tableId: 'premarket-index-gainers-v2',
							fixed: {
								defaultSort: queryGainers.sort,
								controls: {
									results: true,
									export: true,
									columns: true,
									options: true
								},
								columnOptions: MoverDataPoints,
								excludeColumns: ['price', 'volume'],
								columnOrder: queryGainers.columns,
								fixedColumns: ['rank', 's', 'premarketChangePercent'],
								screener: {
									type: 'stocks',
									filters: [
										{
											id: 'premarketChangePercent',
											name: '',
											value: `over-0`,
											filterType: 'numeric',
											numberType: 'percentage'
										},
										{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
										{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
										{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
									],
									sort: [{ id: 'premarketChangePercent', desc: false }],
									showColumns: ['s', 'n', 'premarketChangePercent', 'premarketPrice', 'marketCap'],
									showResultsMenu: true
								}
							},
							dynamic: queryGainers
						}}
					>
						<StockTable _data={props.res.data} />
					</TableContextProvider>
					<TableContextProvider
						value={{
							title: 'Premarket Losers',
							tableId: 'premarket-index-losers-v2',
							fixed: {
								defaultSort: queryLosers.sort,
								controls: {
									results: true,
									export: true,
									columns: true,
									options: true
								},
								columnOptions: MoverDataPoints,
								excludeColumns: ['price', 'volume'],
								columnOrder: queryLosers.columns,
								fixedColumns: ['rank', 's', 'premarketChangePercent'],
								screener: {
									type: 'stocks',
									filters: [
										{
											id: 'premarketChangePercent',
											name: '',
											value: `under-0`,
											filterType: 'numeric',
											numberType: 'percentage'
										},
										{ id: 'price', name: '', value: `over-1`, filterType: 'numeric' },
										{ id: 'close', name: '', value: `over-1`, filterType: 'numeric' },
										{ id: 'marketCap', name: '', value: `over-1M`, filterType: 'numeric' }
									],
									sort: [{ id: 'premarketChangePercent', desc: true }],
									showColumns: ['s', 'n', 'premarketChangePercent', 'premarketPrice', 'marketCap'],
									showResultsMenu: true
								}
							},
							dynamic: queryLosers
						}}
					>
						<StockTable _data={props.losers.data} />
					</TableContextProvider>
				</div>
			</MarketsLayout>
		</PageContextProvider>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	let extras = ['tradingTimestamps']
	const [res, losers] = await Promise.all([getSelect(queryGainers, false, extras), getSelect(queryLosers)])

	return {
		props: {
			res,
			losers
		},
		revalidate: 2 * 60
	}
}
