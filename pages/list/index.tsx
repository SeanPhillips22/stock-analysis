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
				<a className="bll text-lg">{title}</a>
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
			<div className="space-y-6">
				<div>
					<h2 className="hh3 mb-2">Popular Lists</h2>
					<ul className="list-inside list-disc columns-2 space-y-1 p-1">
						<ListItem
							url="/list/biggest-companies/"
							title="Biggest Companies By Market Cap"
						/>
						<ListItem
							url="/list/highest-revenue/"
							title="Companies With The Most Revenue"
						/>
						<ListItem
							url="/list/most-employees/"
							title="Companies With The Most Employees"
						/>
						<ListItem
							url="/list/monthly-dividend-stocks/"
							title="Monthly Dividend Payers"
						/>
						{/* <ListItem
							url="/list/oldest-companies/"
							title="Oldest Companies"
						/> */}
					</ul>
				</div>

				<div>
					<h2 className="hh3 mb-2">Companies Ranked by Market Cap</h2>
					<ul className="list-inside list-disc columns-2 space-y-1 p-1">
						<ListItem
							url="/list/biggest-car-companies/"
							title="Biggest Car Companies"
						/>
						<ListItem
							url="/list/biggest-pharmaceutical-companies/"
							title="Biggest Pharmaceutical Companies"
						/>
						<ListItem
							url="/list/biggest-semiconductor-companies/"
							title="Biggest Semiconductor Companies"
						/>
						<ListItem
							url="/list/biggest-biotech-companies/"
							title="Biggest Biotech Companies"
						/>
					</ul>
				</div>
			</div>
		</LayoutSidebar>
	)
}
