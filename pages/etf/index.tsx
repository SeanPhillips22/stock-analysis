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
			Cell: (props: any) => formatCells('linkSymbol', props, 'etf'),
			sortInverted: true
		},
		{
			Header: 'Fund Name',
			accessor: 'n',
			sortType: 'string'
		},
		{
			Header: 'Asset Class',
			accessor: 'i'
		},
		{
			Header: 'Assets',
			accessor: 'm',
			Cell: (props: any) => formatCells('abbreviate', props),
			sortInverted: true
		}
	]

	return (
		<LayoutSidebar heading="All ETF Symbols" url="/etf/" list={['pro', 'ipoCalendar', 'etfScreener', 'marketMovers']}>
			<SEO
				title="List of All ETF Ticker Symbols"
				description="An overview of all the ETF symbols listed. Explore the ETF pages to learn about the fund’s price history, holdings, dividends and more."
				canonical="/etf/"
			/>
			<SymbolTable title="ETFs" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const etfs = await getData('index?type=etfspage')

	return {
		props: {
			stocks: etfs
		}
	}
}
