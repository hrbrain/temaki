import * as React from 'react'
import styled from '~/modules/theme'
import { css } from 'styled-components'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'

/*
 * Component
 */
type Variant = 'warning' | 'info' | 'progress'

type Props = {
    label: string
    text?: string
    variant: Variant
    onClickClose: () => void
}

export const Component = React.memo<Props>(props => {
    return (
        <Outer
            variant={props.variant}
            data-test={`${props.variant}-default-toast`}
        >
            <Icons
                svg={IconFiles.icons.SingleCheck}
                size="24px"
                color={'white'}
            />
            {props.text ? (
                <div>
                    <Label variant={props.variant}>{props.label}</Label>
                    <Text variant={props.variant}>{props.text}</Text>
                </div>
            ) : (
                <Label variant={props.variant}>{props.label}</Label>
            )}
            <CloseButton onClick={props.onClickClose}>
                <Icons svg={IconFiles.icons.Close} size="24px" color="white" />
            </CloseButton>
        </Outer>
    )
})

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------
type OuterType = {
    variant: Variant
    highlightGreen: string
    red: string
    grayScaleS5: string
}
const Outer = styled.div<{ variant: Variant }>`
    display: inline-flex;
    align-items: start;
    padding: 12px;
    border-radius: 6px;
    box-shadow: ${props => props.theme.shadows.boxShadow.L5};
    ${props =>
        getVariantColor({
            variant: props.variant,
            highlightGreen: props.theme.colors.utilities.highlightGreen.default,
            red: props.theme.colors.utilities.red.default,
            grayScaleS5: props.theme.colors.grayScale.S5
        })}
`
const getVariantColor = (props: OuterType) => {
    switch (props.variant) {
        case 'info':
            return `background-color: ${props.highlightGreen};`
        case 'progress':
            return `background-color: ${props.grayScaleS5};`
        case 'warning':
            return `background-color: ${props.red};`
        default:
            throw Error('not provided type')
    }
}

const getVariantFontColor = ({
    variant,
    textDefault,
    grayScaleS0
}: {
    variant: Variant
    textDefault: string
    grayScaleS0: string
}) => {
    switch (variant) {
        case 'info':
            return `color: ${grayScaleS0};`
        case 'progress':
            return `color: ${textDefault};`
        case 'warning':
            return `color: ${grayScaleS0};`
        default:
            throw Error('not provided type')
    }
}

const Icons = styled(Icon.Component)`
    top: 0;
`

const buttonMixin = css`
    cursor: pointer;
`

const CloseButton = styled.span`
    ${buttonMixin}
`

const Label = styled.div<{ variant: Variant }>`
    max-width: 290px;
    word-break: break-all;
    line-height: 24px;
    font-size: 14px;
    padding-left: 4px;
    font-weight: bold;
    ${props =>
        getVariantFontColor({
            variant: props.variant,
            grayScaleS0: `${props.theme.colors.grayScale.S0}`,
            textDefault: `${props.theme.colors.text.default}`
        })}
`

const Text = styled(Label)`
    line-height: normal;
    font-weight: normal;
    white-space: pre-wrap;
    padding: 4px 0 0 4px;
`
