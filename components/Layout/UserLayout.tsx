import { FC } from 'react'
import { HeaderLogo } from './Header/HeaderLogo'
import Link from 'next/link'
import { FocusedLayout } from './FocusedLayout'

export const UserLayout: FC = ({ children }) => {
	return (
		<>
			<FocusedLayout>
				<div className="max-w-[850px] mx-auto px-6 py-8 sm:py-20 sm:px-0 space-y-6">
					<Link href="/" prefetch={false}>
						<a>
							<HeaderLogo className="h-24 sm:h-28 w-24 sm:w-28 mx-auto mb-6" />
						</a>
					</Link>
					<div className="max-w-md mx-auto">{children}</div>
				</div>
			</FocusedLayout>
		</>
	)
}
