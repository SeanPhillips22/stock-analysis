import { GetStaticProps } from 'next'
import { getData } from 'functions/apis/API'
import { Column } from 'react-table'
import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { SEO } from 'components/SEO'
import { SymbolTable } from 'components/Tables/SymbolTable'
import { formatCell } from 'functions/tables/tableFormat'

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
			Cell: (props: any) => formatCell('linkSymbol', props, 'etf'),
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
			Cell: (props: any) => formatCell('abbreviate', props),
			sortInverted: true
		}
	]

	return (
		<LayoutSidebar heading="All ETFs" url="/etf/">
			<SEO
				title="List of ETF Symbols"
				description="An overview of the ETF symbols currently listed on the site. Explore the ETF pages to learn about the fund’s price history, key information and more."
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
		},
		revalidate: 6 * 60 * 60
	}
}
