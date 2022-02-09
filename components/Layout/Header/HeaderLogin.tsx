import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'hooks/useAuth'
import { useLayoutContext } from 'components/Layout/LayoutContext'

type Props = {
	hideTrial?: boolean
}

export function HeaderLogin({ hideTrial }: Props) {
	const { isLoggedIn, signOut } = useAuth()
	const { url } = useLayoutContext()

	if (isLoggedIn) {
		return (
			<div className="hd-login logged-in">
				<ButtonWhite
					text="Log Out"
					onClick={signOut}
					className="mt-0 py-1 border-0 shadow-none cursor-pointer"
				/>
				{url !== '/pro/my-account/' && (
					<ButtonWhite
						text="My Account"
						url="/pro/my-account/"
						className="mt-0 py-1"
					/>
				)}
			</div>
		)
	}

	return (
		<div className="hd-login">
			<ButtonWhite
				text="Log In"
				url="/login/"
				className="mt-0 py-1 border-0 shadow-none text-gray-700"
			/>
			{!hideTrial && (
				<Button
					text="Free Trial"
					url="/pro/"
					className="mt-0 py-1"
					id="tag-upgr-header-free-trial"
				/>
			)}
		</div>
	)
}
