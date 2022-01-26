module.exports = {
	mode: 'jit',
	purge: {
		content: [
			'./pages/**/*.{js,ts,jsx,tsx}',
			'./components/**/*.{js,ts,jsx,tsx}',
			'./functions/**/*.{js,ts,jsx,tsx}',
			'./data/**/*.{js,ts,jsx,tsx}',
			'./content/**/*.{js,ts,jsx,tsx,mdx}'
		],
		options: {
			safelist: [
				'border-gray-300',
				'bg-blue-400',
				'max-w-md',
				'my-20',
				'gap-3',
				'block',
				'hidden'
			]
		}
	},
	darkMode: false,
	theme: {
		container: {
			center: true,
			padding: '1.5rem'
		},
		screens: {
			tiny: '320px',
			xs: '350px',
			bp: '380px',
			xsm: '600px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1200px',
			xxl: '1280px',
			xxxl: '1440px',
			landscape: { raw: '(orientation: landscape)' }
		},
		extend: {
			gridTemplateColumns: {
				sidebar: 'minmax(0, 1fr) 300px',
				sidebar_narrow: 'minmax(0, 1fr) 300px',
				sidebar_wide: 'minmax(0, 1fr) 336px',
				leftnav: 'auto minmax(0, 1fr)',
				overview: '1fr 1fr 3fr',
				news: '1fr 2fr'
			},
			fontSize: {
				smaller: ['0.95rem', '1.35rem'],
				small: ['0.9rem', '1.3rem'],
				tiny: ['0.8rem', '1.15rem'],
				xxs: ['0.7rem', '0.9rem']
			},
			colors: {
				blue: {
					brand_sharp: 'rgba(44, 98, 136)',
					brand_light: 'rgba(60, 116, 212)',
					sharp: 'rgba(1, 90, 210, 1)',
					link: 'rgb(30, 115, 186, 1)'
				}
			},
			keyframes: {
				pulseup: {
					'0%': { color: 'rgba(0, 128, 0)' },
					'100%': { color: 'inherit' }
				},
				pulsedown: {
					'0%': { color: 'rgba(139, 0, 0)' },
					'100%': { color: 'inherit' }
				}
			},
			animation: {
				pulseup: 'pulseup 0.8s linear 0s',
				pulsedown: 'pulsedown 0.8s linear 0s'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
