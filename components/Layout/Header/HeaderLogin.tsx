import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'
import { useAuth } from 'auth/useAuth'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { useEvent } from 'hooks/useEvent'
import { signOut } from 'auth/supabase/signOut'

type Props = {
	hideTrial?: boolean
}

export function HeaderLogin({ hideTrial }: Props) {
	const { isLoggedIn } = useAuth()
	const { url } = useLayoutContext()
	const { event } = useEvent()

	if (isLoggedIn) {
		return (
			<div className="hd-login logged-in">
				<ButtonWhite text="Log Out" onClick={signOut} className="mt-0 cursor-pointer border-0 py-1 shadow-none" />
				{url !== '/pro/my-account/' && (
					<ButtonWhite text="My Account" url="/pro/my-account/" className="mt-0 py-1" />
				)}
			</div>
		)
	}

	return (
		<div className="hd-login">
			<ButtonWhite
				text="Log In"
				url="/login/"
				className="eventbtn mt-0 border-0 py-1 text-gray-700 shadow-none"
				id="Layout_Header_LoginBtn"
			/>
			{!hideTrial && (
				<Button
					text="Free Trial"
					url="/pro/"
					className="eventbtn mt-0 py-1"
					id="Trial_Layout_Header_FreeTrialBtn"
					onClick={() => event('Free_Trial_Click', { location: 'Header' })}
				/>
			)}
		</div>
	)
}
