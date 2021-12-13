/* eslint-disable react-hooks/exhaustive-deps */
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { Loading } from 'components/Loading'
import { Info } from 'types/Info'
import { SelectPeriod, SelectType, Buttons } from 'components/Chart/SelectUI'
import { getPageDataSSR } from 'functions/callBackEnd'
import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { Unavailable } from 'components/Unavailable'
import { Export } from 'components/Chart/ExportButton'
import { IOHLCData } from 'components/Chart/iOHLCData'
import { useEffect } from 'react'
import StockChart from 'components/Chart/StockChart'

interface ChartProps {
	info: Info
}

const CandleStickStockChart = ({ info }: ChartProps) => {
	const [period, setPeriod] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [time, setTime] = useState<string | null>(null)
	const [type, setType] = useState<string | null>(null)
	const [data, setData] = useState<IOHLCData[]>()
	const [stored, setStored] = useState<string | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let stor = localStorage.getItem('chart')

			const chartObj = stor
				? JSON.parse(stor)
				: {
						time: '1Y',
						period: 'd',
						type: 'candlestick'
				  }

			setStored(stor)
			setTime(chartObj.time)
			setPeriod(chartObj.period)
			setType(chartObj.type)
		}
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			let periodVar

			if (time == '1D' || time == '5D') {
				periodVar = 'd'
			} else {
				periodVar = period
			}

			const chartObj = {
				time: time || null,
				period: periodVar || null,
				type: type || null
			}

			if (time && period && type) {
				if (time === '1Y' && period === 'd' && type === 'candlestick') {
					if (stored) {
						localStorage.removeItem('chart')
					}
				} else {
					localStorage.setItem('chart', JSON.stringify(chartObj))
					setStored(JSON.stringify(chartObj))
				}
			}
		}
	}, [time, period, type])

	return (
		<Stock info={info} url={`/stocks/${info.symbol}/chart/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Stock Chart`}
				description={`Interactive ${info.nameFull} (${info.ticker}) stock chart with full price history, volume, trends and moving averages.`}
				canonical={`/stocks/${info.symbol}/chart/`}
			/>
			<div className="px-2.5 sm:contain-content">
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
									restricted: true
								},
								{
									title: 'Export to CSV',
									type: 'csv',
									restricted: true
								}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('chartpage', symbol, 'stocks')

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
