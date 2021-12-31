import { Info } from 'types/Info'
import StockHeading from 'components/StockHeading/_StockHeading'
import { Layout } from './_Layout'

type Props = {
	children: React.ReactNode
	info: Info
	url: string
}

export function Stock({ children, info, url }: Props) {
	return (
		<Layout>
			<div className="pt-5 sm:pt-6">
				<StockHeading info={info} url={url} />
				{children}
			</div>
		</Layout>
	)
}
