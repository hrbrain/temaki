import * as React from 'react'
import styled from '~/modules/theme'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'
import * as ItemList from './itemList'

/**
 * Component
 */

type Props = {
    items: ItemList.Item[]
    values: ItemList.Value[]
    onClick: () => void
    placeholder?: string
    isError?: boolean
    diff?: boolean
    width?: string
    isMenuVisible?: boolean
}

export const Component = React.memo<Props>(props => {
    return (
        <Body
            data-test="body"
            onClick={props.onClick}
            isMenuVisible={props.isMenuVisible}
            isError={props.isError}
            diff={props.diff}
            width={props.width}
        >
            <Text data-test="text">
                {showTextBySelected(
                    props.items,
                    props.values,
                    props.placeholder
                )}
            </Text>
            <DropDownIcon
                className={props.isMenuVisible ? 'visible' : ''}
                svg={IconFiles.icons.DropdownOff}
                size="24px"
            />
        </Body>
    )
})

const showTextBySelected = (
    items: ItemList.Item[],
    values: ItemList.Value[],
    placeholder?: string
): React.ReactElement | string => {
    if (values.length <= 0) {
        return placeholder || ''
    }
    return (
        <>
            {values.map((value, index) => {
                return renderText(value, index, items)
            })}
        </>
    )
}

const renderText = (value: string, key: number, items: ItemList.Item[]) => {
    const item = items.find(item => item.value === value)

    if (!item) {
        throw new Error(`Items don't have the value`)
    }
    return <InnerText key={key}>{item.text}</InnerText>
}

/**
 * Styles
 */

const DropDownIcon = styled(Icon.Component)`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s;
    &.visible {
        transform: translateY(-50%) rotate(180deg);
    }
`

type BodyType = {
    isMenuVisible?: boolean
    isError?: boolean
    diff?: boolean
    width?: string
}
const Body = styled.div<BodyType>`
    min-height: 40px;
    position: relative;
    ${props => (props.width ? `width: ${props.width};` : '')}
    display: flex;
    align-items: center;
    padding: 0px 12px;
    border: 1px solid
        ${props => {
            if (props.isError) {
                return props.theme.colors.utilities.red.default
            }
            if (props.isMenuVisible) {
                return props.theme.colors.utilities.highlightGreen.default
            }
            return props.theme.colors.grayScale.S10
        }};
    border-radius: 6px;
    user-select: none;
    font-size: 14px;
    cursor: pointer;

    background-color: ${props =>
        props.diff ? props.theme.colors.utilities.paleYellow : 'inherit'};
`

const Text = styled.div`
    padding: 4px 4px 4px 0;
    width: calc(100% - 28px);
`

const InnerText = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.primary.N95};
    padding: 0 4px;
    margin: 4px 8px 4px 0px;
`
