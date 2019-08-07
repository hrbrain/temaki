import * as React from 'react'
import styled, { defaultTheme } from '~/modules/theme'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'

/**
 * Component
 */

type Props = {
    items: Item[]
    selected: string
    onClickItem: (text: string) => void
    className?: string
    isVisible: boolean
    width: number
}

export const Component = React.memo<Props>(
    ({ items, selected, onClickItem, className, isVisible, width }) => {
        return (
            <ItemList
                data-test="itemList"
                className={`${className} ${isVisible ? '' : 'hide'}`}
                width={width}
            >
                {items.map(renderItem(selected, onClickItem))}
            </ItemList>
        )
    }
)

const renderItem = (selected: string, onClickItem: (text: string) => void) => (
    item: Item,
    index: number
) => {
    return (
        <ItemComponent
            text={item.text}
            key={index}
            selected={selected}
            onClickItem={onClickItem}
        />
    )
}

/**
 * ItemComponent
 */

export type Item = {
    text: string
}

type ItemProps = {
    selected: string
    onClickItem: (text: string) => void
} & Item

const ItemComponent = React.memo<ItemProps>(props => {
    const handleClick = React.useCallback(() => {
        props.onClickItem(props.text)
    }, [])

    return (
        <Item onClick={handleClick}>
            <Icon.Component
                svg={IconFiles.icons.SingleCheck}
                size="24px"
                color={
                    props.text === props.selected
                        ? defaultTheme.colors.primary.default
                        : defaultTheme.colors.grayScale.S10
                }
            />
            <Text>{props.text}</Text>
        </Item>
    )
})

/**
 * Styles
 */

const ItemList = styled.ul<{ width: number }>`
    background: ${props => props.theme.colors.grayScale.S0};
    border-radius: 6px;
    box-shadow: ${props => props.theme.shadows.dropShadow.L5};
    width: ${props => props.width}px;
    max-width: 262px;
    max-height: 204px;
    overflow: auto;
`

const Item = styled.li`
    list-style-type: none;
    padding: 12px 12px 0 12px;
    user-select: none;
    font-size: 14px;
    display: flex;
    cursor: pointer;
`

const Text = styled.div`
    padding-left: 4px;
`