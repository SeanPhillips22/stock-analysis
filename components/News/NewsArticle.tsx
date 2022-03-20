/* eslint-disable @next/next/no-img-element */
import { News } from 'types/News'
import { Tickers } from './Tickers'
import { NewsAds } from './NewsAds'
import { useState } from 'react'

type Props = {
	item: News
	related?: string
	ad: number
	loadAds: boolean
}

export function NewsArticle({ item, related, ad, loadAds }: Props) {
	const [imgSrc, setImgSrc] = useState<string | undefined>(item.image)
	const onError = () => setImgSrc('/blank.png')

	return (
		<>
			<div className="news-article">
				<a href={item.url} target="_blank" rel="nofollow noopener noreferrer" aria-hidden="true" tabIndex={-1}>
					<img loading="lazy" src={imgSrc} width={640} height={360} alt="" onError={onError} />
				</a>
				<div>
					<h3>
						<a href={item.url} target="_blank" rel="noopener noreferrer nofollow">
							{item.title}
						</a>
					</h3>
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
			</div>
			{loadAds && <NewsAds ad={ad} />}
		</>
	)
}
