import { DatabaseIcon } from 'components/Icons/DatabaseIcon'
import { LightningBoltIcon } from 'components/Icons/LightningBoltIcon'
import { EmojiHappyIcon } from 'components/Icons/EmojiHappyIcon'
import { AdjustmentsIcon } from 'components/Icons/AdjustmentsIcon'

const features = [
	{
		name: 'Data accuracy',
		description:
			'We are committed to the highest standards of data accuracy. We use both automated scans and manual reviews of the data to ensure this.',
		icon: DatabaseIcon
	},
	{
		name: 'Ease of use',
		description:
			'Our goal is for the site to be clean, simple and intuitive to both use and understand. It should "just work."',
		icon: EmojiHappyIcon
	},
	{
		name: 'Speed',
		description:
			'Few things are more annoying than slow and unresponsive websites. This site is super fast and we aim to make everything load instantly.',
		icon: LightningBoltIcon
	},
	{
		name: 'Integrity',
		description: "We don't promote individual stocks and present each data point following objective rules.",
		icon: AdjustmentsIcon
	}
]

export function AboutFeatures() {
	return (
		<section className="bg-white pt-14 pb-20">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="lg:text-center">
					<h2 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
						What sets us apart
					</h2>
					<p className="mt-4 max-w-lg text-xl text-gray-500 lg:mx-auto">
						We want to make investing easy and accessible with data that is up-to-date and highly accurate.
					</p>
				</div>

				<div className="mt-10">
					<dl className="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
						{features.map(feature => (
							<div key={feature.name} className="relative">
								<dt>
									<div className="absolute flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
										<feature.icon className="h-6 w-6" aria-hidden="true" />
									</div>
									<p className="ml-16 text-lg font-medium leading-6 text-gray-900">{feature.name}</p>
								</dt>
								<dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	)
}
