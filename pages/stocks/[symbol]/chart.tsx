/* eslint-disable no-unused-vars */
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { Loading } from 'components/Loading'
import { Info } from 'types/Info'
import { SelectPeriod, SelectType, Buttons } from 'components/Chart/SelectUI'
import { getPageData } from 'functions/callBackEnd'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { Unavailable } from 'components/Unavailable'
import { Export } from 'components/Chart/ExportButton'
import { IOHLCData } from 'components/Chart/iOHLCData'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { isFunction } from 'util'
import { local } from 'd3-selection'

const StockChart = dynamic(() => import('components/Chart/StockChart'), {
	ssr: false,
})

interface ChartProps {
	info: Info
}

const CandleStickStockChart = ({ info }: ChartProps) => {
	const [period, setPeriod] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [time, setTime] = useState<string | null>(null)
	const [type, setType] = useState<string | null>(null)
	const [data, setData] = useState<IOHLCData[]>()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (!localStorage.getItem('time')) {
				localStorage.setItem('time', '1Y')
			}
			setTime(localStorage.getItem('time'))
			if (!localStorage.getItem('period')) {
				localStorage.setItem('period', 'd')
			}
			setPeriod(localStorage.getItem('period'))

			if (!localStorage.getItem('type')) {
				localStorage.setItem('type', 'candlestick')
			}
			setType(localStorage.getItem('type'))
			console.log('period useEffect stock')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('type', type || '')
		console.log('type useEffect stock')
	}, [type])

	useEffect(() => {
		localStorage.setItem('time', time || '')
		console.log('time useEffect stock')
		let periodVar
		if (time == '1D' || time == '5D') {
			periodVar = 'd'
		} else {
			periodVar = period
		}
		localStorage.setItem('period', periodVar || '')
	}, [time, period])

	/* useEffect(() => {
		localStorage.setItem('period', period || '')
		console.log('period useEffect stock')
	}, [period]) */

	return (
		<Stock info={info} url={`/stocks/${info.symbol}/chart/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Stock Chart`}
				description={`Interactive ${info.nameFull} (${info.ticker}) stock chart with full price history, volume, trends and moving averages.`}
				canonical={`/stocks/${info.symbol}/chart/`}
			/>
			<div className="px-2.5 sm:contain">
				<div className="py-2">
					<div className="flex flex-row justify-between items-center border border-gray-200 mb-2 text-sm bp:text-base">
						<Buttons state={time} dispatch={setTime} />
						<SelectPeriod
							time={time}
							dispatcher={setPeriod}
							period={period}
						/>
						<SelectType type={type} dispatcher={setType} />
						<Export
							buttons={[
								{
									title: 'Export to Excel',
									type: 'xlsx',
									restricted: true,
								},
								{
									title: 'Export to CSV',
									type: 'csv',
									restricted: true,
								},
							]}
							data={data}
							setData={setData}
							time={time}
						/>
					</div>
					<div className="touch-none h-[400px] xs:h-[450px] bp:h-[500px] sm:h-[600px]">
						{info.state !== 'upcomingipo' ? (
							<div className="touch-auto h-[400px] xs:h-[450px] bp:h-[500px] sm:h-[600px]">
								{loading && <Loading />}

								<StockChart
									stockSymbol={info.ticker}
									stockType={info.type}
									period={period}
									time={time}
									type={type}
									setLoading={setLoading}
									loading={loading}
									setData={setData}
								/>
							</div>
						) : (
							<Unavailable message="The chart is not available for this stock." />
						)}
					</div>
				</div>
			</div>
		</Stock>
	)
}

export default CandleStickStockChart

interface IParams extends ParsedUrlQuery {
	symbol: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams
	return await getPageData('chartpage', symbol, 3600, 'stocks')
}

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' }
}
