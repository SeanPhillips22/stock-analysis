import Link from 'next/link'
import { useAuth } from 'hooks/useAuth'

interface Props {
	setOpen: (open: boolean) => void
}

export const HeaderLogin = ({ setOpen }: Props) => {
	const { isLoggedIn, signOut } = useAuth()

	const LogInOut = () => {
		if (!isLoggedIn) {
			return (
				<Link href="/login/" prefetch={false}>
					<a
						className="block lg:inline py-2 px-3 flex-1 text-white bg-gray-500 lg:flex-none lg:bg-white lg:text-black lg:font-normal hover:text-blue-700"
						onClick={() => setOpen(false)}
					>
						Log In
					</a>
				</Link>
			)
		} else {
			return (
				<span
					className="block lg:inline py-2 px-3 flex-1 text-white bg-gray-500 lg:flex-none lg:bg-white lg:text-black lg:font-normal hover:text-blue-700 cursor-pointer"
					onClick={() => {
						signOut()
					}}
				>
					Log Out
				</span>
			)
		}
	}

	const TrialOrAccount = () => {
		if (!isLoggedIn) {
			return (
				<Link href="/pro/" prefetch={false}>
					<a
						className="block lg:inline-block py-2 px-4 lg:py-1 lg:px-3 flex-1 bg-blue-brand_light lg:flex-none text-white lg:rounded-sm lg:font-normal hover:bg-blue-brand_sharp transition duration-200"
						onClick={() => setOpen(false)}
						id="tag-upgr-header"
					>
						Free Trial
					</a>
				</Link>
			)
		} else {
			return (
				<Link href="/pro/my-account/" prefetch={false}>
					<a
						className="block lg:inline-block py-2 px-4 lg:py-1 lg:px-3 flex-1 bg-blue-brand_light lg:flex-none text-white lg:rounded-sm lg:font-normal hover:bg-blue-brand_sharp transition duration-200"
						onClick={() => setOpen(false)}
					>
						My Account
					</a>
				</Link>
			)
		}
	}

	return (
		<div className="flex flex-row text-center lg:block lg:space-x-1 text-lg">
			<LogInOut />
			<TrialOrAccount />
		</div>
	)
}
