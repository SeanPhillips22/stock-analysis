import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'hooks/useAuth'

export function NavLogin() {
	const { isLoggedIn, signOut } = useAuth()

	if (isLoggedIn) {
		return (
			<div className="nav-login logged-in">
				<ButtonWhite text="Log Out" onClick={signOut} />
				<ButtonWhite text="My Account" url="/pro/my-account/" />
			</div>
		)
	}

	return (
		<div className="nav-login">
			<Button text="Free Trial" url="/pro/" />
			<ButtonWhite text="Login" url="/login/" className="mt-3" />
		</div>
	)
}
