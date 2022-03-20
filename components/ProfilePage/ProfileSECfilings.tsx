import { SecFilings, Filing } from 'types/Company'
import { External } from 'components/CustomLink'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Info } from 'types/Info'
import { getData } from 'functions/apis/API'

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
					if (!entries.length || newData.filings[0].time !== entries[0].time) {
						setEntries(newData.filings)
						setUpdated(newData.updated)
					}
				}

				setFetched(true)
			}

			const now = new Date().getTime()
			const timestamp = Date.parse(updated)
			const diff = (now - timestamp) / 1000

			if ((entries && !entries.length) || diff > 12 * 60 * 60 || isNaN(diff) || !updated) {
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
							<th scope="col" className="py-2 px-1 text-left text-gray-800 xs:px-2">
								Date
							</th>
							<th scope="col" className="py-2 px-1 text-left text-gray-800 xs:px-2">
								Type
							</th>
							<th scope="col" className="py-2 px-1 text-left text-gray-800 xs:px-2">
								Title
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map(entry => {
							return (
								<tr key={entry['url']} className="border-b border-gray-200">
									<td className="whitespace-nowrap py-3 pr-1 align-top text-gray-900 xs:px-2">
										<span title={entry['time']}>{entry['cleantime']}</span>
									</td>
									<td className="py-3 px-1 align-top text-gray-900 xs:px-2">{entry['type']}</td>
									<td className="py-3 pl-1 align-top xs:px-2">
										<External url={entry['url']} text={entry['title']} />
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
