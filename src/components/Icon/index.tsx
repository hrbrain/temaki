import * as React from 'react'
import styled from '~/modules/theme'

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------

export type Props = {
    svg: string
    size: string
    color?: string
    className?: string
}
export const Component = (props: Props) => (
    <Wrap
        size={props.size}
        color={props.color}
        dangerouslySetInnerHTML={{ __html: props.svg }}
        className={props.className}
    />
)

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------

type WrapProps = {
    color?: string
    size: string
}
const Wrap = styled.div<WrapProps>`
    height: ${props => props.size};
    width: ${props => props.size};
    & svg {
        height: ${props => props.size};
        width: ${props => props.size};
    }
    & #fill {
        fill: ${props => props.color};
    }
`
