import { cn } from 'functions/helpers/classNames'
import { News } from 'types/News'
import { NewsArticle } from './NewsArticle'
import { NewsVideo } from './NewsVideo'

type Props = {
	data: News[]
	related?: string
	paywalled?: boolean
}

export function NewsFeed({ data, related, paywalled }: Props) {
	let i = 2
	let ads = 0
	let loadAds = false
	const count = data.length

	return (
		<div className={cn('news-feed', paywalled ? 'pw-shadow' : '')}>
			{data.map((item, index) => {
				// Logic to render news feed ads
				// first ad should load after 3 articles or 1 video + 1 article
				// second ad should load after 5 articles or 2 videos + 1 article
				loadAds = false
				if (ads < 2) {
					i = item.type === 'Video' ? i + 2 : i + 1

					// If only few news items, load ad at the bottom
					if (count < 3 && count === index + 1) {
						loadAds = true
						ads++
						i = 0
					} else if (i > 4) {
						loadAds = true
						ads++
						i = 0
					}
				}

				if (item.type === 'Video') {
					return (
						<NewsVideo
							key={`${item.title} + ${index}`}
							item={item}
							related={related}
							loadAds={loadAds}
							ad={ads}
						/>
					)
				} else {
					return (
						<NewsArticle
							key={`${item.title} + ${index}`}
							item={item}
							related={related}
							loadAds={loadAds}
							ad={ads}
						/>
					)
				}
			})}
		</div>
	)
}
