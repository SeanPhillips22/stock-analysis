import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { ActionProps } from 'components/Actions/actions.types'
import { CellString } from 'types/Tables'

export default function ActionsAll({ data }: ActionProps) {
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
			Header: 'Type',
			accessor: 'type'
		},
		{
			Header: 'Action',
			accessor: 'text'
		}
	]

	return (
		<>
			<SEO
				title="Corporate Actions List - Recent and Historical"
				description="A comprehensive list of recent and historical corporate actions and stock changes for companies listed on the US stock market."
				canonical="/actions/"
			/>
			<ActionsLayout url="/actions/">
				<ActionsTable
					key="Actions"
					title="Recent Corporate Actions"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="all"
				/>
			</ActionsLayout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('all')

	return {
		props: {
			data
		},
		revalidate: 2 * 60 * 60
	}
}
