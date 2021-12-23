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
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1'
import { Mobile1 } from 'components/Ads/Snigel/Mobile1'

interface Props {
	info: Info
	data: Company
}

const SymbolStatistics = ({ info, data }: Props) => {
	return (
		<Stock info={info} url={`/stocks/${info.symbol}/company/`}>
			<SEO
				title={`${info.nameFull} (${info.ticker}) Company Profile & Overview`}
				description={`Company profile for ${info.nameFull} (${info.ticker}) with a description, list of executives, contact details and other key facts.`}
				canonical={`/stocks/${info.symbol}/company/`}
			/>
			<div className="contain-content mt-4 sm:mt-5 lg:mt-6">
				<div className="float-none lg:float-left lg:profilewrap">
					<ProfileDescription text={data.description} />
				</div>

				<div className="float-none lg:float-right lg:max-w-[336px]">
					<ProfileInfo info={data.info} logo={data.logo} />
					<div className="hidden lg:block lg:mt-8">
						<Sidebar1 />
					</div>
					<div className="block mt-8 sm:hidden sm:mt-0">
						<Mobile1 />
					</div>
					<ProfileContact contact={data.contact} />
					<ProfileDetails details={data.stockDetails} />
				</div>

				<div className="float-none lg:float-left lg:profilewrap mb-2">
					<ProfileExecutives executives={data.executives} />
					<ProfileSECfilings
						key={info.symbol}
						info={info}
						cik={data.stockDetails.cik}
						filings={data.secFilings}
					/>
				</div>
			</div>
			<div className="clear-both min-h-5"></div>
		</Stock>
	)
}
export default SymbolStatistics

export const getServerSideProps: GetServerSideProps = async (context) => {
	const symbol = context?.params?.symbol as string
	const data = await getPageDataSSR('profile', symbol)

	context.res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return data
}
