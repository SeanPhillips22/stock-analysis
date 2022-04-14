import Script from 'next/script'
import { useAuthState } from 'auth/useAuthState'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

declare global {
	interface Window {
		$crisp: any
	}
}

// Hide the widget
export function hideWidget() {
	window?.$crisp?.push(['do', 'chat:hide'])
}

export function CrispChat() {
	const router = useRouter()
	const { user, isLoggedIn } = useAuthState()

	// Show widget when entering a page that requires it
	// Hide widget if navigated away from the page
	useEffect(() => {
		window?.$crisp?.push(['do', 'chat:show'])
		router.events.on('routeChangeComplete', hideWidget)

		return () => {
			router.events.off('routeChangeComplete', hideWidget)
		}
	}, [router.events])

	return (
		<>
			<Script strategy="lazyOnload" id="crisp-chat">
				{`window.$crisp=[];window.CRISP_WEBSITE_ID="462df10f-fb43-4ca4-9537-e0af8a974bba";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
			</Script>

			{isLoggedIn && user?.email && (
				<Script
					strategy="lazyOnload"
					id="crisp-chat-info"
				>{`$crisp.push(["set", "user:email", "${user.email}"])`}</Script>
			)}
		</>
	)
}
