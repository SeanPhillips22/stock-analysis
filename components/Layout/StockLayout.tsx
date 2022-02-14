import { Info } from 'types/Info'
import StockHeading from 'components/StockHeading/_StockHeading'
import { Layout } from './_Layout'
import { SymbolContextProvider } from './SymbolContext'
import { SEO } from 'components/SEO'

type Props = {
	children: React.ReactNode
	info: Info
	url: string
	title?: string
	description?: string
	data?: any
}

export function Stock({
	children,
	info,
	url,
	title,
	description,
	data
}: Props) {
	return (
		<Layout url={url}>
			{/* SEO Config */}
			{title && description && (
				<SEO
					title={`${info.nameFull} (${info.ticker}) Forecast`}
					description={`Forecast for ${info.name} (${info.ticker}), including stock price, revenue and earnings.`}
					canonical={url}
				/>
			)}

			<SymbolContextProvider value={{ info, data }}>
				<div className="pt-5 sm:pt-6">
					<StockHeading info={info} url={url} />
					{children}
				</div>
			</SymbolContextProvider>
		</Layout>
	)
}
