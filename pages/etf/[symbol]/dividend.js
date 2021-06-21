import Stock from '@/components/Layout/StockLayout';
import { getPageData, getEtfInfo } from '@/Functions/callBackEnd';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import InfoBox from '@/components/InfoBox';
import InfoTable from '@/components/Dividend/InfoTable';
import HistoryTable from '@/components/Dividend/HistoryTable';
import NewsWidget from '@/components/News/NewsWidget';
import DividendChart from '@/components/Dividend/DividendChart';

export default function Holdings({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<div className="contain">
				<div className="lg:grid grid-cols-sidebar_wide py-1 gap-8">
					<div>
						<h1 className="text-xl bp:text-2xl font-bold">
							{info.ticker} Dividend Information
						</h1>
						{data.infoBox && <InfoBox text={data.infoBox} />}
						<InfoTable data={data.infoTable} />
						{data.history.length > 0 && (
							<HistoryTable rawdata={data.history} />
						)}
						<DividendChart
							data={data.chartData}
							options={data.chartOptions}
						/>
					</div>
					<aside className="mt-7 lg:mt-5">
						<NewsWidget
							title={`${info.ticker} News`}
							news={data.news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`,
							}}
						/>
					</aside>
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getEtfInfo({ params });
	const data = await getPageData(info.id, 'dividend');

	return {
		props: {
			info,
			data,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
