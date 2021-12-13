import { ReactNode } from 'react'
import { Info } from 'types/Info'
import StockHeading from 'components/StockHeading/_StockHeading'
import { Layout } from './_Layout'

interface Props {
	children: ReactNode
	info: Info
	url: string
}

export const Stock = ({ children, info, url }: Props) => {
	return (
		<>
			<Layout>
				<div className="pt-5 sm:pt-6 w-full xl:max-w-screen-xl">
					<StockHeading info={info} url={url} />
					{children}
				</div>
			</Layout>
		</>
	)
}
