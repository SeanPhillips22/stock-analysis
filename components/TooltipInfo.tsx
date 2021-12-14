import Tippy, { TippyProps } from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'

export function TooltipInfo(props: JSX.IntrinsicAttributes & TippyProps) {
	const Content = () => (
		<div>
			<h3 className="hh3">Implied Shares Outstanding</h3>
			<p>
				The total number of outstanding shares. If the company has many
				different types of shares, then this number assumes that all of the
				company's stock is converted into the current share class. This
				number is used for calculating the company's market cap.
			</p>
		</div>
	)

	return (
		<Tippy content={<Content />} theme="light" delay={400}>
			<span className="text-xs text-gray-600 font-medium absolute -right-2.5 -top-1.5 p-1 cursor-pointer">
				i
			</span>
		</Tippy>
	)
}
