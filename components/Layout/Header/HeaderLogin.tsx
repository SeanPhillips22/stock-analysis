import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'hooks/useAuth'

export function HeaderLogin() {
	const { isLoggedIn, signOut } = useAuth()

	if (isLoggedIn) {
		return (
			<div className="hd-login logged-in">
				<ButtonWhite
					text="Log Out"
					onClick={signOut}
					className="mt-0 py-1 border-0 shadow-none cursor-pointer"
				/>
				<ButtonWhite
					text="My Account"
					url="/pro/my-account/"
					className="mt-0 py-1"
				/>
			</div>
		)
	}

	return (
		<div className="hd-login">
			<ButtonWhite
				text="Login"
				url="/login/"
				className="mt-0 py-1 border-0 shadow-none"
			/>
			<Button text="Free Trial" url="/pro/" className="mt-0 py-1" />
		</div>
	)
}
