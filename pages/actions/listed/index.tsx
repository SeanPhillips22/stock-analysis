import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { ActionProps } from 'components/Actions/actions.types'
import { CellString } from 'types/Tables'

export const ActionsListed = ({ data }: ActionProps) => {
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
				title="Most Recently Listed Stocks"
				description="Recent and historical listings on the US stock market. Includes both IPOs and stocks listed for other reasons."
				canonical="/actions/listed/"
			/>
			<ActionsLayout url="/actions/listed/">
				<ActionsTable
					key="listings"
					title="Recently Listed Stocks"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="listed"
				/>
			</ActionsLayout>
		</>
	)
}

export default ActionsListed

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('listed')

	return {
		props: {
			data
		}
	}
}
