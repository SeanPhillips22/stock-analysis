export type Action = {
	date: string
	name: string
	symbol: string
}

export interface ActionProps {
	year?: string
	data: {
		data: Action[]
		fullCount: number
	}
}

export interface ActionSplitsProps {
	data: {
		annual: {
			forward: {
				[key: string]: number
			}
			reverse: {
				[key: string]: number
			}
		}
		monthly: {
			forward: {
				[key: string]: number
			}
			reverse: {
				[key: string]: number
			}
		}
		years: {
			forward: {
				[key: string]: {
					[key: string]: number
				}
			}
			reverse: {
				[key: string]: {
					[key: string]: number
				}
			}
		}
	}
}
