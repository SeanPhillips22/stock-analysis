import { Info } from 'types/Info'
import { InformationCircleIcon } from 'components/Icons/InformationCircle'
import { TitleByline } from './TitleByline'

export function Title({ info }: { info: Info }) {
	if (!info.symbol) return null
	let isIpo = info.state === 'upcomingipo'
	let name = info.nameFull || info.name

	return (
		<div className="mb-4">
			<h1 className="symbol-title">{`${name} (${info.ticker})`}</h1>
			{info.quote && info.state !== 'upcomingipo' && !info.archived && (
				<TitleByline info={info} />
			)}
			{info.notice && (
				<div className={isIpo ? 'sh-notice-ipo' : 'sh-notice'}>
					<span>
						<InformationCircleIcon
							classes={isIpo ? 'sh-info-ipo' : 'sh-info'}
						/>
					</span>
					<span>{info.notice}</span>
				</div>
			)}
		</div>
	)
}
