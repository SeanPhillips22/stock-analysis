import { GetStaticProps } from 'next'
import { getData } from 'functions/apis/API'
import { Column } from 'react-table'
import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { SEO } from 'components/SEO'
import { SymbolTable } from 'components/Tables/SymbolTable'
import { formatCells } from 'functions/tables/formatCells'

type Props = {
	stocks: {
		s: string
		n: string
		i: string
		m: number
	}[]
}

export default function StocksIndexPage({ stocks }: Props) {
	const columns: Column[] = [
		{
			Header: 'Symbol',
			accessor: 's',
			Cell: (props: any) => formatCells('linkSymbol', props, 'stocks'),
			sortInverted: true
		},
		{
			Header: 'Company Name',
			accessor: 'n',
			sortType: 'string'
		},
		{
			Header: 'Industry',
			accessor: 'i'
		},
		{
			Header: 'Market Cap',
			accessor: 'm',
			Cell: (props: any) => formatCells('abbreviate', props),
			sortInverted: true
		}
	]

	return (
		<LayoutSidebar heading="All Stock Symbols" url="/stocks/">
			<SEO
				title="List of All Stock Ticker Symbols"
				description="An overview of all the stock ticker symbols listed. Explore the stock pages to learn about the company’s price history, financials, key stats, and more."
				canonical="/stocks/"
			/>
			<SymbolTable title="Stocks" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const stocks = await getData('index?type=stockspage')

	return {
		props: {
			stocks
		}
	}
}
