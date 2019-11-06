import * as React from 'react'

import * as Box from './presentors/Box'
import * as Circle from './presentors/Circle'
import * as TextPresentor from './presentors/Text'

/**
 * Utils
 */

export type ColorTypeProp =
    | 'primary'
    | 'primary ghost'
    | 'secondary'
    | 'secondary ghost'
    | 'destructive'
    | 'destructive ghost'
    | 'disabled'

export const buttonShapeType = {
    box: 'box' as const,
    circle: 'circle' as const,
    text: 'text' as const
}

// 別のコンポーネントで必要なら共通化して下さい
const useIsLoadingByAsyncClick = (
    fn:
        | ((e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>)
        | undefined
): [boolean, (e: React.MouseEvent<HTMLButtonElement>) => void] => {
    const [isLoading, setIsLoading] = React.useState(false)
    const handleClick = React.useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!fn) {
                return
            }
            const res = fn(e)
            if (res) {
                setIsLoading(true)
                res.then(() => setIsLoading(false))
            }
        },
        [isLoading, fn]
    )

    return [isLoading, handleClick]
}

/**
 * Component
 */

type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
    colorType?: ColorTypeProp
} & (
    | {
          type: typeof buttonShapeType.box
          height?: string
          width?: string
      }
    | {
          type: typeof buttonShapeType.circle
          svg?: string
      }
    | {
          type: typeof buttonShapeType.text
          svg?: string
      })
export const Component: React.FC<Props> = ({
    colorType = 'primary',
    onClick,
    children,
    ...props
}) => {
    const [isLoading, handleClick] = useIsLoadingByAsyncClick(onClick)

    switch (props.type) {
        case 'circle':
            return (
                <Circle.Component
                    onClick={handleClick}
                    colorType={colorType}
                    isLoading={isLoading}
                    {...props}
                />
            )

        case 'text':
            return (
                <TextPresentor.Component
                    onClick={handleClick}
                    colorType={colorType}
                    svg={props.svg}
                    {...props}
                >
                    {children}
                </TextPresentor.Component>
            )

        default:
            return (
                <Box.Component
                    height={props.height}
                    width={props.width}
                    colorType={colorType}
                    onClick={handleClick}
                    {...props}
                >
                    {isLoading ? 'loading...' : children}
                </Box.Component>
            )
    }
}
