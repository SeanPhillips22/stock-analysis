import { FinancialsNavigation } from 'components/FinancialTable/Navigation/_FinancialsNavigation'
import { SEO } from 'components/SEO'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'
import { Stock } from './StockLayout'

type Props = {
	children: React.ReactNode
	info: Info
	url: string
	title: string
	description: string
	statement: Statement
	range: Range
}

export function FinancialsLayout({
	children,
	info,
	url,
	title,
	description,
	statement,
	range
}: Props) {
	return (
		<Stock info={info} url={url}>
			<SEO title={title} description={description} canonical={url} />
			<div className="px-4 lg:px-6 mx-auto">
				<FinancialsNavigation
					info={info}
					statement={statement}
					range={range}
				/>
				{children}
			</div>
		</Stock>
	)
}
