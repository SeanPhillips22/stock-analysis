import { useAuthState } from 'hooks/useAuthState'
import Link from 'next/link'

export function UpgradePrompt() {
	const { isLoggedIn, checked, isPro } = useAuthState()

	if (isLoggedIn && checked && !isPro) {
		return (
			<div className="mb-3 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-700">
				<div className="flex flex-row items-center">
					<div className="ml-1">
						<span className="text-sm">There is no active subscription on this account.</span>{' '}
						<span className="mt-1">
							<Link href="/pro/my-account/" prefetch={false}>
								<a className="text-sm font-medium text-yellow-800 hover:text-yellow-600">Activate Now</a>
							</Link>
						</span>
					</div>
				</div>
			</div>
		)
	}

	return null
}
