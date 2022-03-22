/* eslint-disable react-hooks/exhaustive-deps */
import { Stock } from 'components/Layout/StockLayout'
import { Info } from 'types/Info'
import { SelectPeriod, SelectType, Buttons } from 'components/Chart/SelectUI'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { Loading } from 'components/Loading/Loading'
import { IOHLCData } from 'components/Chart/iOHLCData'
import { Export } from 'components/Chart/ExportButton'
import { useEffect } from 'react'
import { Unavailable } from 'components/Unavailable'
import StockChart from 'components/Chart/StockChart'

export default function ChartPage({ info }: { info: Info }) {
	const [period, setPeriod] = useState<string | null>(null)
	const [time, setTime] = useState<string | null>(null)
	const [type, setType] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
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
		<Stock
			info={info}
			url={`/etf/${info.symbol}/chart/`}
			title={`${info.name} (${info.ticker}) Stock Chart`}
			description={`Interactive ${info.name} (${info.ticker}) stock chart with full price history, volume, trends and moving averages.`}
		>
			<div className="sm:contain-content px-2.5">
				<div className="py-2">
					<div className="mb-2 flex flex-row items-center justify-between border border-gray-200 text-sm bp:text-base">
						<Buttons state={time} dispatch={setTime} />
						<SelectPeriod time={time} period={period} dispatcher={setPeriod} />
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
					<div className="h-[400px] touch-none xs:h-[450px] bp:h-[500px] sm:h-[600px]">
						{info.state !== 'upcomingipo' ? (
							<div className="h-[400px] touch-auto xs:h-[450px] bp:h-[500px] sm:h-[600px]">
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

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('chartpage', symbol, 'etf')
	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=3600')
	return data
}
