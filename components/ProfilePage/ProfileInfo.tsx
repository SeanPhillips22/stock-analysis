/* eslint-disable @next/next/no-img-element */
import { CompanyInfo, Logo } from 'types/Company'

interface Props {
	info: CompanyInfo
	logo: Logo
}

export const ProfileInfo = ({ info, logo }: Props) => {
	return (
		<div className="mt-7 rounded border border-gray-200 bg-gray-50 px-3 pt-3 pb-2 xs:px-4 xs:pt-4 lg:mt-1">
			<div className="pb-3 text-center text-2xl font-semibold">{info.name}</div>
			{logo.src && (
				<div className="mb-2">
					<img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} className="mx-auto py-1" />
				</div>
			)}
			<table className="profile-table w-full">
				<tbody>
					{info.country && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">Country</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.country}</td>
						</tr>
					)}
					{info.founded && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">Founded</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.founded}</td>
						</tr>
					)}
					{info.ipoDate && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">IPO Date</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.ipoDate}</td>
						</tr>
					)}
					{info.industry && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">Industry</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.industry}</td>
						</tr>
					)}
					{info.sector && info.sector !== 'Blank Check / SPAC' && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">Sector</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.sector}</td>
						</tr>
					)}
					{info.employees && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">Employees</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.employees}</td>
						</tr>
					)}
					{info.ceo && (
						<tr>
							<td className="py-1.5 px-1 font-semibold lg:py-2">CEO</td>
							<td className="py-1.5 px-1 text-right lg:py-2">{info.ceo}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
}
