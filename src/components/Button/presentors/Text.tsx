import * as React from 'react'
import styled, { ThemeConsumer, RequiredThemeProps } from '~/modules/theme'

import * as Styles from '../lib/styles'

import * as Icon from '~/components/Icon'

/**
 * Component
 */

type Props = {
    svg?: string
    colorType?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export const Component: React.FC<Props> = ({
    svg,
    colorType,
    children,
    ...props
}) => (
    <Outer {...props}>
        {renderIcon(svg, colorType)}
        <Text colorType={colorType} data-test="text-button-child">
            {children}
        </Text>
    </Outer>
)

function renderIcon(
    svg?: string,
    colorType?: string
): React.ReactElement | null {
    if (!svg) {
        return null
    }
    return (
        <ThemeConsumer>
            {theme => (
                <Icon.Component
                    svg={svg}
                    size="24px"
                    color={selectIconColor(theme, colorType)}
                />
            )}
        </ThemeConsumer>
    )
}

function selectIconColor(theme: RequiredThemeProps, colorType?: string) {
    switch (colorType) {
        case 'destructive':
            return theme.colors.utilities.red
        default:
            return undefined
    }
}

/**
 * Styles
 */

const Outer = styled.button`
    ${Styles.buttonBaseMixin}
    ${Styles.rippleEffectMixin}
    height: 24px;
    width: auto;
`

const Text = styled.span<{ colorType?: string }>`
    color: ${props => {
        switch (props.colorType) {
            case 'destructive':
                return props.theme.colors.utilities.red
            default:
                return props.theme.colors.text
        }
    }};
    font-size: 14px;
    font-weight: normal;
    white-space: nowrap;
`
