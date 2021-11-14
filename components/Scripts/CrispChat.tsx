import Script from 'next/script'
import { useAuth } from 'hooks/useAuth'

export const CrispChat = () => {
	const { user, isLoggedIn } = useAuth()

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
