import { GetServerSideProps } from 'next'
import { TrendingAll } from 'types/Trending'
import { SEO } from 'components/SEO'
import { SymbolTableSimple } from 'components/Tables/SymbolTableSimple'
import { getData } from 'functions/apis/API'
import { Column } from 'react-table'
import { StockLink } from 'components/Links'
import { abbreviate } from 'components/StockScreener/functions/abbreviate'
import { Features } from 'components/Layout/Sidebar/Features'
import { Layout } from 'components/Layout/_Layout'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'

type Props = {
	timestamp: string
	data: TrendingAll[]
}

export default function Trending({ timestamp, data }: Props) {
	const url = '/trending/'
	const format0dec = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	})

	const format2dec = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})

	const columns: Column[] = [
		{
			Header: 'No.',
			accessor: 'no'
		},
		{
			Header: 'Symbol',
			accessor: 'symbol',
			Cell: function DateCell({ cell: { value } }: any) {
				if (value.startsWith('=')) {
					return value.slice(1)
				}
				return <StockLink symbol={value} />
			},
			sortType: (a, b) => {
				let ad = a.values.symbol
				let bd = b.values.symbol
				if (ad.startsWith('=')) {
					ad = ad.slice(1)
				}
				if (bd.startsWith('=')) {
					bd = bd.slice(1)
				}
				if (ad < bd) {
					return 1
				}
				if (ad > bd) {
					return -1
				} else {
					return 0
				}
			},
			sortInverted: true
		},
		{
			Header: 'Name',
			accessor: 'name',
			sortType: (a, b) => {
				const ad = a.values.name.toUpperCase()
				const bd = b.values.name.toUpperCase()
				if (ad < bd) {
					return 1
				}
				if (ad > bd) {
					return -1
				} else {
					return 0
				}
			},
			sortInverted: true
		},
		{
			Header: 'Views',
			accessor: 'pageviews',
			Cell: function FormatCell({ cell: { value } }: any) {
				return format0dec.format(value)
			},
			sortInverted: true
		},
		{
			Header: 'Market Cap',
			accessor: 'marketCap',
			Cell: function FormatCell({ cell: { value } }: any) {
				if (!value) {
					return 'n/a'
				}
				return abbreviate(value, format2dec)
			},
			sortInverted: true
		},
		{
			Header: 'Price',
			accessor: 'price',
			Cell: ({ cell: { value } }: any) => {
				if (!value) {
					return 'n/a'
				}
				return '$' + Number(value).toFixed(2)
			},
			sortInverted: true
		},
		{
			Header: 'Change',
			accessor: 'change',
			sortType: 'alphanumeric',
			Cell: function FormatCell({ cell: { value } }: any) {
				if (value === 'IPO') {
					return <span title="Upcoming IPO">IPO</span>
				}
				const fixed = value ? value + '%' : 'n/a'

				if (value > 0) {
					return <span className="text-[green]">{fixed}</span>
				} else if (value < 0) {
					return <span className="text-[red]">{fixed}</span>
				} else {
					return <span className="text-gray-800">{fixed}</span>
				}
			},
			sortInverted: true
		},
		{
			Header: 'Volume',
			accessor: 'volume',
			Cell: function FormatCell({ cell: { value } }: any) {
				if (value === 'IPO') {
					return <span title="Upcoming IPO">IPO</span>
				}
				return format0dec.format(value)
			},
			sortInverted: true
		}
	]

	return (
		<>
			<SEO
				title="Today's Top Trending Stocks"
				description="A list of the top 20 most popular stocks today based on pageviews. The list is updated multiple times per day."
				canonical={url}
			/>
			<Layout url={url}>
				<div className="contain py-5 xs:py-6">
					<h1 className="hh1 mb-0 border-b-[3px] border-blue-brand_sharp pb-3">
						Trending Today
					</h1>

					<div className="lg:right-sidebar mt-3 sm:mt-4 lg:mt-5">
						<div>
							<SymbolTableSimple
								title="Stocks"
								columndata={columns}
								rowdata={data}
								append="Top"
							/>
							<div className="mt-1.5 text-sm text-gray-600">
								Updated: {timestamp}. Stocks are sorted by pageviews
								according to Google Analytics. For upcoming IPOs, the
								price shown is either the estimated price or the
								midpoint of the price range.
							</div>
						</div>
						<aside className="space-y-8 py-0">
							<Sidebar1 key={url} />
							<Features />
						</aside>
					</div>
				</div>
			</Layout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const raw = await getData('trending?q=trendingAll')
	const { timestamp, data } = raw

	res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=60')

	return {
		props: {
			timestamp,
			data
		}
	}
}
