import { SecFilings, Filing } from 'types/Company'
import { External } from 'components/CustomLink'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Info } from 'types/Info'
import { getData } from 'functions/API'

interface Props {
	info: Info
	cik: string
	filings: SecFilings
}

export const ProfileSECfilings = ({ info, cik, filings }: Props) => {
	const [entries, setEntries] = useState<Filing[]>(filings.filings)
	const [updated, setUpdated] = useState<string>(filings.updated)
	const [fetched, setFetched] = useState(false)

	useEffect(() => {
		const source = Axios.CancelToken.source()

		if (!fetched) {
			const fetchSecData = async () => {
				const url = `sec?cik=${cik}&c=10&s=${info.symbol}&t=${info.type}&json=1`

				const newData = await getData(url)

				if (newData) {
					if (
						!entries.length ||
						newData.filings[0].time !== entries[0].time
					) {
						setEntries(newData.filings)
						setUpdated(newData.updated)
					}
				}

				setFetched(true)
			}

			const now = new Date().getTime()
			const timestamp = Date.parse(updated)
			const diff = (now - timestamp) / 1000

			if (
				(entries && !entries.length) ||
				diff > 12 * 60 * 60 ||
				isNaN(diff) ||
				!updated
			) {
				fetchSecData()
			}
		}

		return () => {
			source.cancel('Unmounted')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!entries || !entries.length) {
		return null
	} else {
		return (
			<>
				<h2 className="hh2">Latest SEC Filings</h2>
				<table className="w-full text-smaller bp:text-base">
					<thead>
						<tr className="border-b border-t border-gray-200 bg-gray-50">
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Date
							</th>
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Type
							</th>
							<th
								scope="col"
								className="text-left py-2 px-1 xs:px-2 text-gray-800"
							>
								Title
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, index) => {
							return (
								<tr key={index} className="border-b border-gray-200">
									<td className="py-3 pr-1 xs:px-2 text-gray-900 whitespace-nowrap align-top">
										<span title={entry['time']}>
											{entry['cleantime']}
										</span>
									</td>
									<td className="py-3 px-1 xs:px-2 text-gray-900 align-top">
										{entry['type']}
									</td>
									<td className="py-3 pl-1 xs:px-2 align-top">
										<External
											url={entry['url']}
											text={entry['title']}
										/>
									</td>
								</tr>
							)
						})}
						<tr className="border-b border-gray-200">
							<td colSpan={3} className="py-3 px-4 text-xl font-medium">
								<External
									url={`https://www.sec.gov/cgi-bin/browse-edgar?CIK=${cik}&count=100`}
									text="View All SEC Filings"
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</>
		)
	}
}
