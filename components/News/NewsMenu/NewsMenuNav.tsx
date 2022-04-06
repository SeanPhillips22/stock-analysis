import { useEvent } from 'hooks/useEvent'

type Props = {
	show: string
	setShow: (value: string) => void
	setError: (value: string) => void
	pageType: string
}

export function NewsMenuNav({ show, setShow, setError, pageType }: Props) {
	const { event } = useEvent()

	return (
		<div className="mb-0.5 text-smaller xs:text-base">
			<ul className="flex flex-row space-x-1 whitespace-nowrap bp:space-x-2 sm:space-x-5">
				<li>
					<button
						className={show === 'all' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-all"
						onClick={() => {
							setError('')
							setShow('all')
							event('News_Menu', { type: 'All' })
						}}
					>
						All
					</button>
				</li>
				<li>
					<button
						className={show === 'v' ? 'font-semibold' : 'bll hidden sm:block'}
						id="tag-feat-news-menu-videos"
						onClick={() => {
							setError('')
							setShow('v')
							event('News_Menu', { type: 'Videos' })
						}}
					>
						Videos
					</button>
				</li>
				{pageType === 'stocks' && (
					<li>
						<button
							className={show === 'pr' ? 'font-semibold' : 'bll hidden sm:block'}
							id="tag-feat-news-menu-press"
							onClick={() => {
								setError('')
								setShow('pr')
								event('News_Menu', { type: 'Press_Releases' })
							}}
						>
							Press
							<span className="hidden xs:inline"> Releases</span>
						</button>
					</li>
				)}
				<li>
					<button
						className={show === 'chat' ? 'font-semibold' : 'bll'}
						id="tag-feat-news-menu-chat"
						onClick={() => {
							setError('')
							setShow('chat')
							event('News_Menu', { type: 'Conversation' })
						}}
					>
						Conversation
					</button>
				</li>
			</ul>
		</div>
	)
}
