/* eslint-disable no-unused-vars */
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { Info } from 'types/Info'
import { SelectPeriod, SelectType, Buttons } from 'components/Chart/SelectUI'
import { getPageData } from 'functions/callBackEnd'
import { useState } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Loading } from 'components/Loading'
import { IOHLCData } from 'components/Chart/iOHLCData'
import { Export } from 'components/Chart/ExportButton'
import { useEffect } from 'react'
import { ParsedUrlQuery } from 'querystring'
import dynamic from 'next/dynamic'
import { Unavailable } from 'components/Unavailable'

const StockChart = dynamic(() => import('components/Chart/StockChart'), {
	ssr: false,
})

interface ChartProps {
	info: Info
}

const CandleStickStockChart = ({ info }: ChartProps) => {
	const [period, setPeriod] = useState<string | null>(null)
	const [time, setTime] = useState<string | null>(null)
	const [type, setType] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
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
			console.log('one load etf')
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('type', type || '')
		console.log('type useEffect etf')
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
	/*
	useEffect(() => {
		localStorage.setItem('period', period || '')
		console.log('period useEffect etf')
	}, [period]) */

	return (
		<Stock info={info} url={`/etf/${info.symbol}/chart/`}>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Chart`}
				description={`Interactive ${info.name} (${info.ticker}) stock chart with full price history, volume, trends and moving averages.`}
				canonical={`/etf/${info.symbol}/chart/`}
			/>
			<div className="px-2.5 sm:contain">
				<div className="py-2">
					<div className="flex flex-row justify-between items-center border border-gray-200 mb-2 text-sm bp:text-base">
						<Buttons state={time} dispatch={setTime} />
						<SelectPeriod time={time} dispatcher={setPeriod} />
						<SelectType dispatcher={setType} />
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
	return await getPageData('chartpage', symbol, 3600, 'etf')
}

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' }
}
