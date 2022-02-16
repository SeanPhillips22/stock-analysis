import { Executive } from 'types/Company'

interface Props {
	executives: Executive[]
}

export const ProfileExecutives = ({ executives }: Props) => {
	if (!executives) {
		return null
	}

	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8 lg:mt-4">Key Executives</h2>
			<table className="mb-6 w-full text-base xs:mb-8">
				<thead className="bg-gray-50">
					<tr className="border-b border-t border-gray-200">
						<th
							scope="col"
							className="py-2.5 px-2 text-left font-medium text-gray-800 xs:py-3 xs:px-3 sm:px-4"
						>
							Name
						</th>
						<th
							scope="col"
							className="py-2.5 px-2 text-left font-medium text-gray-800 xs:py-3 xs:px-3 sm:px-4"
						>
							Position
						</th>
					</tr>
				</thead>
				<tbody>
					{executives.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="py-2.5 px-2 align-top font-medium text-gray-900 xs:py-3 xs:px-3 sm:px-4">
								{item.Name}
							</td>
							<td className="py-2.5 px-2 align-top text-gray-800 xs:py-3 xs:px-3 sm:px-4">
								{item.Title}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}
