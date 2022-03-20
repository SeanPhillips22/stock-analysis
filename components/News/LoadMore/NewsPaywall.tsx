import { Button } from 'components/Buttons/Button'
import { ButtonWhite } from 'components/Buttons/ButtonWhite'

export function NewsPaywall() {
	return (
		<div className="relative -mt-8 flex h-[180px] justify-center bg-white sm:mt-3 sm:h-auto">
			<div className="absolute max-w-[85%] text-center sm:static">
				<h4 className="mb-2.5 text-3xl font-semibold text-gray-900">Get unlimited news</h4>
				<p className="mb-0.5 text-base font-medium text-gray-700">
					Keep scrolling with a free 30-day trial of Stock Analysis Pro
				</p>
				<div className="flex justify-center space-x-6">
					<Button text="Free Trial" url="/pro/" className="w-44" id="tag-upgr-news-below" />
					<ButtonWhite text="Sign In" url="/login/" className="w-44" id="tag-upgr-news-below-login" />
				</div>
			</div>
		</div>
	)
}
