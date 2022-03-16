import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { SEO } from 'components/SEO'
import Link from 'next/link'

export default function StockListPage() {
	return (
		<LayoutSidebar heading="Stock Lists" url="/list/">
			<SEO
				title="Stock Lists"
				// description="Lists of stocks that share common characteristics. See companies ranked by market cap, employee count, sales or others."
				canonical="/list/"
			/>
			<ul className="space-y-1">
				<li>
					<Link href="/list/biggest-companies/" prefetch={false}>
						<a className="bll text-lg">Biggest Companies By Market Cap</a>
					</Link>
				</li>
				<li>
					<Link href="/list/biggest-car-companies/" prefetch={false}>
						<a className="bll text-lg">
							Biggest Car Companies by Market Cap
						</a>
					</Link>
				</li>
				<li>
					<Link href="/list/monthly-dividend-stocks/" prefetch={false}>
						<a className="bll text-lg">Monthly Dividend Payers</a>
					</Link>
				</li>
			</ul>
		</LayoutSidebar>
	)
}
