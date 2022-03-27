import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { SEO } from 'components/SEO'
import Link from 'next/link'

type Props = {
	url: string
	title: string
}

function ListItem({ url, title }: Props) {
	return (
		<li>
			<Link href={url} prefetch={false}>
				<a className="bll text-base md:text-lg">{title}</a>
			</Link>
		</li>
	)
}

export default function StockListPage() {
	return (
		<LayoutSidebar heading="Stock Lists" url="/list/">
			<SEO
				title="Stock Lists"
				description="Lists of stocks that share common characteristics. See companies ranked by market cap, employee count, sales or others."
				canonical="/list/"
			/>
			<div className="mb-8 space-y-6">
				<div>
					<h2 className="hh3 mb-2">Popular Lists</h2>
					<ul className="list-outside list-disc space-y-1 p-1 pl-6 md:columns-2">
						<ListItem url="/list/biggest-us-companies/" title="Biggest U.S. Companies By Market Cap" />
						<ListItem url="/list/highest-revenue/" title="U.S. Companies With The Most Revenue" />
						<ListItem url="/list/most-employees/" title="U.S. Companies With The Most Employees" />
						<ListItem url="/list/top-rated-dividend-stocks/" title="Top-Rated Dividend Stocks" />
						<ListItem url="/list/monthly-dividend-stocks/" title="Stocks That Pay Monthly Dividends" />
						{/* <ListItem
							url="/list/oldest-companies/"
							title="Oldest Companies"
						/> */}
					</ul>
				</div>

				<div>
					<h2 className="hh3 mb-2">Stocks Ranked by Market Cap</h2>
					<ul className="list-inside list-disc space-y-1 p-1 md:columns-2">
						<ListItem url="/list/car-company-stocks/" title="Cars & Automakers" />
						<ListItem url="/list/pharmaceutical-stocks/" title="Pharmaceuticals" />
						<ListItem url="/list/semiconductor-stocks/" title="Semiconductors" />
						<ListItem url="/list/biotech-stocks/" title="Biotech" />
						<ListItem url="/list/bank-stocks/" title="Banks" />
						<ListItem url="/list/social-media-stocks/" title="Social Media" />
						<ListItem url="/list/gaming-stocks/" title="Gaming" />
						<ListItem url="/list/esports/" title="E-Sports" />
						<ListItem url="/list/online-gambling/" title="Online Gambling" />
						<ListItem url="/list/mobile-games/" title="Mobile Games" />
					</ul>
				</div>
			</div>
		</LayoutSidebar>
	)
}
