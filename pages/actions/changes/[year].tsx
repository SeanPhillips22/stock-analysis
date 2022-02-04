import { GetStaticProps, GetStaticPaths } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { ParsedUrlQuery } from 'querystring'
import { ActionProps } from 'components/Actions/actions.types'
import { CellString } from 'types/Tables'
import { ActionsPaywall } from 'components/Actions/ActionsPaywall'

export const ActionsChangesYear = ({ year, data }: ActionProps) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date'
		},
		{
			Header: 'Old',
			accessor: 'oldsymbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />
				}
				return value
			}
		},
		{
			Header: 'New',
			accessor: 'newsymbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />
				}
				return value
			}
		},
		{
			Header: 'New Company Name',
			accessor: 'name'
		}
	]

	return (
		<>
			<SEO
				title={`${year} Stock Ticker Symbol Changes`}
				description={`A list of all stock ticker symbol changes in ${year}, including all public companies listed on the main US exchanges.`}
				canonical={`/actions/changes/${year}/`}
			/>
			<ActionsLayout>
				<ActionsTable
					key={`Changes-${year}`}
					title={`${year} Stock Symbol Changes`}
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="changes"
					year={year}
				/>
				<ActionsPaywall
					count={data.data.length}
					fullCount={data.fullCount}
					title="Symbol Changes"
				/>
			</ActionsLayout>
		</>
	)
}
export default ActionsChangesYear

interface IParams extends ParsedUrlQuery {
	year: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams
	const data = await getActionsData('changes', year)

	return {
		props: {
			year,
			data
		}
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
