import { HeaderLogo } from 'components/Layout/Header/HeaderLogo'
import Link from 'next/link'

type Props = {
	email: string
}

export function Submitted({ email }: Props) {
	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-lg">
				<Link href="/" prefetch={false}>
					<a>
						<HeaderLogo className="h-16 xs:h-24 sm:h-28 w-16 xs:w-24 sm:w-28 mx-auto mb-2 xs:mb-4 sm:mb-8" />
					</a>
				</Link>
				<h1 className="mt-2 xs:mt-4 sm:mt-6 text-center text-2xl xs:text-3xl font-bold text-gray-900">
					Click the login link in your email
				</h1>
				<p className="mt-4 text-center font-medium text-smaller text-gray-600">
					Open your email and click the login link, no password required.
					Your browser will remember your login details so you do not have
					to repeat this all the time.
				</p>
			</div>
		</>
	)
}
