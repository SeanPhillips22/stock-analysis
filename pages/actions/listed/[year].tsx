import { GetStaticPaths, GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { ParsedUrlQuery } from 'querystring'
import { ActionProps } from 'components/Actions/actions.types'
import { CellString } from 'types/Tables'
import { ActionsPaywall } from 'components/Actions/ActionsPaywall'

export const ActionsListedYear = ({ year, data }: ActionProps) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date'
		},
		{
			Header: 'Symbol',
			accessor: 'symbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />
				}
				return value
			}
		},
		{
			Header: 'Company Name',
			accessor: 'name'
		}
	]

	return (
		<>
			<SEO
				title={`Stocks Listed in ${year}`}
				description={`All stocks listed on the US stock market in ${year}. This includes common shares of companies listed on the main US exchanges.`}
				canonical={`/actions/listed/${year}/`}
			/>
			<ActionsLayout url={`/actions/listed/${year}/`}>
				<ActionsTable
					key={`Listings-${year}`}
					title={`Stocks Listed in ${year}`}
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="listed"
					year={year}
				/>
				<ActionsPaywall count={data.data.length} fullCount={data.fullCount} title="Listings" />
			</ActionsLayout>
		</>
	)
}

export default ActionsListedYear

interface IParams extends ParsedUrlQuery {
	year: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams
	const data = await getActionsData('listed', year)

	return {
		props: {
			year,
			data
		},
		revalidate: year == '2022' ? 2 * 60 * 60 : 7 * 24 * 60 * 60
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	// Generate paths for all the years with existing data
	const current = 2022
	const last = 1998
	const diff = current - last

	const params = []
	for (let i = 0; i < diff + 1; i++) {
		params.push({ params: { year: `${last + i}` } })
	}

	return {
		paths: params,
		fallback: false
	}
}
