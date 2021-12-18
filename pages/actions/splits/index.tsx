import { GetStaticProps } from 'next'
import { SEO } from 'components/SEO'
import { getActionsData } from 'functions/apis/callBackEnd'
import { ActionsLayout } from 'components/Actions/ActionsLayout'
import { ActionsTable } from 'components/Actions/ActionsTable'
import { StockLink } from 'components/Links'
import { CellString, ActionProps } from 'components/Actions/actions.types'

export const ActionsSplits = ({ data }: ActionProps) => {
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
			accessor: 'splitType'
		},
		{
			Header: 'Split Ratio',
			accessor: 'splitRatio'
		},
		{
			Header: 'Company Name',
			accessor: 'name'
		}
	]

	return (
		<>
			<SEO
				title={`Recent Stock Splits: 1998-${new Date().getFullYear()}`}
				description="The most recent stock splits on the US stock market, including both regular (forward) splits and reverse splits."
				canonical="/actions/splits/"
			/>
			<ActionsLayout title="Stock Splits" url="/actions/splits/">
				<ActionsTable
					key="Splits"
					title="Splits"
					columndata={columns}
					rowdata={data.data}
					fullCount={data.fullCount}
					type="splits"
				/>
			</ActionsLayout>
		</>
	)
}

export default ActionsSplits

export const getStaticProps: GetStaticProps = async () => {
	const data = await getActionsData('splits')

	return {
		props: {
			data
		},
		revalidate: 2 * 60 * 60
	}
}
