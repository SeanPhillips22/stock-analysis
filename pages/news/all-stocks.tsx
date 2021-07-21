import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { SEO } from 'components/SEO';
import { getMarketNews } from 'functions/callBackEnd';
import { NewsNavigation } from 'components/News/NewsNavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsFeed } from 'components/News/_NewsFeed';
import { NewsWidget } from 'components/News/NewsWidget';

interface Props {
	data: News[];
	other: News[];
}

export const AllStockNews = ({ data, other }: Props) => {
	return (
		<>
			<SEO
				title="All Stock News"
				description="The latest news on individual stocks on the US stock market, gathered from trusted finance and investing websites."
				canonical="news/all-stocks/"
			/>
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">All Stock News</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1 sm:py-2 lg:py-3">
							<NewsFeed data={data} related="Stocks" />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<NewsWidget
								title="Press Releases"
								news={other}
								button={{
									text: 'All Press Releases',
									url: '/news/press-releases/',
								}}
							/>
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default AllStockNews;

export const getStaticProps: GetStaticProps = async () => {
	const { data, other } = await getMarketNews('stocks');

	return {
		props: {
			data,
			other,
		},
		revalidate: 5 * 60,
	};
};