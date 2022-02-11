import { News } from 'types/News'
import { Tickers } from './Tickers'
import { LiteYouTubeEmbed } from './LiteYouTubeEmbed'
import { NewsAds } from './NewsAds'

type Props = {
	item: News
	related?: string
	ad: number
	loadAds: boolean
}

export function NewsVideo({ item, related, ad, loadAds }: Props) {
	return (
		<>
			<div className="news-video">
				<h3>{item.title}</h3>
				<div className="news-e">
					<LiteYouTubeEmbed id={item.url} title={item.title} />
				</div>
				<p>{item.text}</p>
				{item.tickers && item.tickers.length > 0 && (
					<div className="news-t">
						<Tickers tickers={item.tickers} intro={related} />
					</div>
				)}
				<div className="news-bl" title={item.timeFull}>
					{`${item.timeAgo} - ${item.source}`}
				</div>
			</div>
			{loadAds && <NewsAds ad={ad} />}
		</>
	)
}
