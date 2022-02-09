import Link from 'next/link'

type Props = {
	url: string
	title: string
	css: 'active' | 'inactive'
}

export function NavTab({ url, title, css }: Props) {
	return (
		<li>
			<Link href={url} prefetch={false}>
				<a data-title={title} className={css}>
					{title}
				</a>
			</Link>
		</li>
	)
}
