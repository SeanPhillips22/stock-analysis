import { GetServerSideProps } from 'next'
import { Info } from 'types/Info'
import { Company } from 'types/Company'
import { Stock } from 'components/Layout/StockLayout'
import { SEO } from 'components/SEO'
import { getPageDataSSR } from 'functions/apis/callBackEnd'
import { ProfileDescription } from 'components/ProfilePage/ProfileDescription'
import { ProfileInfo } from 'components/ProfilePage/ProfileInfo'
import { ProfileContact } from 'components/ProfilePage/ProfileContact'
import { ProfileDetails } from 'components/ProfilePage/ProfileDetails'
import { ProfileExecutives } from 'components/ProfilePage/ProfileExecutives'
import { ProfileSECfilings } from 'components/ProfilePage/ProfileSECfilings'
import { Sidebar1All } from 'components/Ads/AdSense/Sidebar1All'

type Props = {
	info: Info
	data: Company
}

export default function SymbolStatistics({ info, data }: Props) {
	const url = `/stocks/${info.symbol}/company/`

	return (
		<Stock info={info} url={url}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Company Profile & Overview`}
				description={`Company profile for ${info.nameFull} (${info.ticker}) with a description, list of executives, contact details and other key facts.`}
				canonical={url}
			/>
			<div className="contain-content mt-4 sm:mt-5 lg:mt-6">
				<div className="lg:profilewrap float-none lg:float-left">
					<ProfileDescription text={data.description} />
				</div>

				<div className="float-none lg:float-right lg:w-[336px]">
					<ProfileInfo info={data.info} logo={data.logo} />
					<Sidebar1All key={url} />
					<ProfileContact contact={data.contact} />
					<ProfileDetails details={data.stockDetails} />
				</div>

				<div className="lg:profilewrap float-none mb-2 lg:float-left">
					<ProfileExecutives executives={data.executives} />
					<ProfileSECfilings
						key={info.symbol}
						info={info}
						cik={data.stockDetails.cik}
						filings={data.secFilings}
					/>
				</div>
			</div>
			<div className="min-h-5 clear-both"></div>
		</Stock>
	)
}

export const getServerSideProps: GetServerSideProps = async context => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('profile', symbol)

	context.res.setHeader('Cache-Control', 'public, max-age=0, s-max-age=1800')

	return data
}
