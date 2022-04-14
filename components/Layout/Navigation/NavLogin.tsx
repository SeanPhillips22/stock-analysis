import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'auth/useAuth'

export function NavLogin() {
	const { isLoggedIn, signOut } = useAuth()

	if (isLoggedIn) {
		return (
			<div className="nav-login">
				<ButtonWhite text="Log Out" onClick={signOut} className="px-0 text-base" />
				<ButtonWhite text="My Account" url="/pro/my-account/" className="mt-3 px-0 text-base" />
			</div>
		)
	}

	return (
		<div className="nav-login">
			<Button
				text="Free Trial"
				url="/pro/"
				className="eventbtn text-base"
				id="Trial_Layout_MobileNav_FreeTrialBtn"
			/>
			<ButtonWhite text="Log In" url="/login/" className="eventbtn mt-3 text-base" id="Layout_MobileNav_LoginBtn" />
		</div>
	)
}
