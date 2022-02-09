import { Logo } from '../Logo'
import Link from 'next/link'
import { Layout } from './_Layout'

type Props = {
	children: React.ReactNode
	url: string
}

export function UserLayout({ children, url }: Props) {
	return (
		<>
			<Layout fullWidth={true} url={url}>
				<div className="max-w-[850px] mx-auto px-6 py-8 sm:py-20 sm:px-0 space-y-6">
					<Link href="/" prefetch={false}>
						<a>
							<Logo className="h-24 sm:h-28 w-24 sm:w-28 mx-auto mb-6" />
						</a>
					</Link>
					<div className="max-w-md mx-auto">{children}</div>
				</div>
			</Layout>
		</>
	)
}
