import * as React from 'react'
import AutoSizer, { AutoSizerProps } from 'react-virtualized-auto-sizer'
import { IOHLCData } from './iOHLCData'

export interface WithSizeProps {
	readonly width: number
	readonly height: number
	readonly period: string | null
	readonly time: string | null
	readonly loading: boolean
	readonly message: string
	readonly stockId: number
	readonly data: IOHLCData[]
}

export const withSize = (props?: Omit<AutoSizerProps, 'children'>) => {
	return <TProps extends WithSizeProps>(OriginalComponent: React.ComponentClass<TProps>) => {
		return class WithSize extends React.Component<Omit<TProps, 'width' | 'height'>> {
			public render() {
				return (
					<AutoSizer {...props}>
						{({ height, width }) => {
							return <OriginalComponent {...(this.props as TProps)} height={height} width={width} />
						}}
					</AutoSizer>
				)
			}
		}
	}
}
