import { Contact } from 'types/Company'

const address = (address: string) => {
	return { __html: address }
}

export const ProfileContact = ({ contact }: { contact: Contact }) => {
	if (!contact.address && !contact.phone && !contact.website) {
		return null
	}

	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8">Contact Details</h2>
			<div className="rounded border border-gray-200 bg-gray-50 px-4 pt-4 pb-2">
				<table className="w-full">
					<tbody>
						{contact.address && (
							<tr>
								<td colSpan={2} className="pb-3">
									<div className="mb-2 text-lg font-bold">
										Address:
									</div>
									<div
										dangerouslySetInnerHTML={address(contact.address)}
									/>
								</td>
							</tr>
						)}
						{contact.phone && (
							<tr className="border-t border-gray-200">
								<td className="py-2 px-0.5 font-semibold">Phone</td>
								<td className="py-2 px-0.5 text-right">
									{contact.phone}
								</td>
							</tr>
						)}
						{contact.website && contact.domain && (
							<tr className="border-t border-gray-200">
								<td className="py-2 px-0.5 font-semibold">Website</td>
								<td className="py-2 px-0.5 text-right">
									<a
										href={contact.website}
										target="_blank"
										rel="noopener noreferrer nofollow"
										className="bll"
									>
										{contact.domain.length > 30
											? 'Visit Website'
											: contact.domain}
									</a>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
