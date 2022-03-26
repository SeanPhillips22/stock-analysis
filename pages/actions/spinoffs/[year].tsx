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

export const ActionsSpinoffsYear = ({ year, data }: ActionProps) => {
	const columns = [
		{
			Header: 'Date',
			accessor: 'date'
		},
		{
			Header: 'Parent',
			accessor: 'old',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />
				}
				return value
			}
		},
		{
			Header: 'New Stock',
			accessor: 'symbol',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				if (value.startsWith('$')) {
					return <StockLink symbol={value.slice(1)} />
				}
				return value
			}
		},
		{
			Header: 'Parent Company',
			accessor: 'oldname',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				return <span title={value}>{value}</span>
			}
		},
		{
			Header: 'New Company',
			accessor: 'name',
			Cell: function FormatCell({ cell: { value } }: CellString) {
				return <span title={value}>{value}</span>
			}
		}
	]

	return (
		<>
			<SEO
				title={`All ${year} Stock Spinoffs`}
				description={`A list of all US-listed public company stock spinoffs in the year 2021. It includes common shares listed on the NYSE and NASDAQ.`}
				canonical={`/actions/spinoffs/${year}/`}
			/>
			<ActionsLayout url={`/actions/spinoffs/${year}/`}>
				<ActionsTable
					key={`Spinoffs-${year}`}
					title={`${year} Stock Spinoffs`}
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="spinoffs"
					year={year}
				/>
				<ActionsPaywall count={data.data.length} fullCount={data.fullCount} title="Spinoffs" />
			</ActionsLayout>
		</>
	)
}

export default ActionsSpinoffsYear

interface IParams extends ParsedUrlQuery {
	year: string
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams
	const data = await getActionsData('spinoffs', year)

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
