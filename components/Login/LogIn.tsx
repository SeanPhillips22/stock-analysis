import { HeaderLogo } from 'components/Layout/Header/HeaderLogo'
import Link from 'next/link'
import { useState } from 'react'

type Props = {
	signIn: (email: string) => void
}

export function LogIn({ signIn }: Props) {
	const [typed, setTyped] = useState('')

	return (
		<>
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Link href="/" prefetch={false}>
					<a>
						<HeaderLogo className="h-16 xs:h-24 sm:h-28 w-16 xs:w-24 sm:w-28 mx-auto mb-2 xs:mb-4 sm:mb-8" />
					</a>
				</Link>
				<h1 className="mt-2 xs:mt-4 sm:mt-6 text-center text-2xl xs:text-3xl font-bold text-gray-900">
					Log in to your account
				</h1>
				<p className="mt-2 text-center font-medium text-smaller text-gray-600">
					Or{' '}
					<Link href="/pro/" prefetch={false}>
						<a className="bll" id="tag-upgr-login">
							start your free 30-day trial
						</a>
					</Link>
				</p>
			</div>

			<div className="mt-6 xs:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-6 xs:py-8 px-4 sm:rounded-lg sm:px-10 border border-gray-300">
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<div className="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
								value={typed}
								onChange={(e) => setTyped(e.target.value)}
							/>
						</div>
					</div>

					<div className="mt-2">
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-brand_light hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							onClick={() => {
								signIn(typed)
							}}
						>
							Log in
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
