import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'hooks/useAuth'

export function NavLogin() {
	const { isLoggedIn, signOut } = useAuth()

	if (isLoggedIn) {
		return (
			<div className="nav-login logged-in">
				<ButtonWhite
					text="Log Out"
					onClick={signOut}
					className="text-base px-0"
				/>
				<ButtonWhite
					text="My Account"
					url="/pro/my-account/"
					className="mt-3 text-base px-0"
				/>
			</div>
		)
	}

	return (
		<div className="nav-login">
			<Button text="Free Trial" url="/pro/" className="text-base" />
			<ButtonWhite text="Login" url="/login/" className="mt-3 text-base" />
		</div>
	)
}
