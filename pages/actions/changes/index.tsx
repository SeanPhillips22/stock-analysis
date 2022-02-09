import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { ActionProps } from 'components/Actions/actions.types'
import { CellString } from 'types/Tables'

export const ActionsChanges = ({ data }: ActionProps) => {
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
				title={`All Stock Ticker Symbol Changes From 1998 to ${new Date().getFullYear()}`}
				description="A list of recent and historical stock ticker symbol changes. It is updated daily, with history that goes all the way back to 1998."
				canonical="/actions/changes/"
			/>
			<ActionsLayout url="/actions/changes/">
				<ActionsTable
					key="Changes"
					title="Recent Stock Symbol Changes"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="changes"
				/>
			</ActionsLayout>
		</>
	)
}
export default ActionsChanges

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('changes')

	return {
		props: {
			data
		},
		revalidate: 2 * 60 * 60
	}
}
