import * as React from 'react'
import styled from '~/modules/theme'

import * as ClickOutside from '~/modules/ClickOutside'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'
import * as ItemList from '../ItemList'

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------
type Props = {
    items: ItemList.Item[]
    value: ItemList.Value
    searchValue: string
    onClick: (e: React.MouseEvent) => void
    onClickOutside: () => void
    onClickMenuItem: (index: string) => void
    isError?: boolean
    isMenuVisible?: boolean
    showIconBySelected: (
        items: ItemList.Item[],
        selected: ItemList.Value
    ) => JSX.Element | null
    showTextBySelected: (
        items: ItemList.Item[],
        selected: ItemList.Value
    ) => JSX.Element | null
    width?: string
    diff?: boolean
    className?: string
}

export const Component = React.memo<Props>(props => {
    return (
        <Wrap width={props.width}>
            <ClickOutside.Component
                onClickOutside={props.onClickOutside}
                inactive={!props.isMenuVisible}
            >
                <Body
                    data-test="body"
                    onClick={props.onClick}
                    diff={props.diff}
                >
                    {props.showIconBySelected(props.items, props.value)}
                    <Text data-test="text">
                        {props.showTextBySelected(props.items, props.value)}
                    </Text>
                    <DropDownIcon
                        className={props.isMenuVisible ? 'visible' : ''}
                        svg={IconFiles.icons.DropdownOff}
                        size="24px"
                    />
                </Body>
                <StyledItemList
                    items={props.items}
                    value={props.value}
                    onClickItem={props.onClickMenuItem}
                    isVisible={props.isMenuVisible}
                />
            </ClickOutside.Component>
        </Wrap>
    )
})

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------

const Wrap = styled.div<{ width?: string }>`
    position: relative;
    width: ${props => props.width || '100%'};
`

const StyledItemList = styled(ItemList.Component)<{ isVisible?: boolean }>`
    position: absolute;
    margin-top: 4px;
    transform-origin: top;
    transition: 0.2s;
    ${props =>
        props.isVisible
            ? `
        visibility: visible;
        transform: scaleY(1);
    `
            : `
        visibility: hidden;
        transform: scaleY(0);
    `}
`

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

const Body = styled.div<{ width?: string; diff?: boolean }>`
    width: ${props => props.width || '100%'};
    display: flex;
    border-radius: 6px;
    user-select: none;
    font-size: 14px;
    cursor: pointer;

    background-color: ${props =>
        props.diff ? props.theme.colors.utilities.paleYellow : 'inherit'};
`

const Text = styled.div`
    padding-right: 4px;
    word-break: break-word;
    width: 100%;
    max-width: 210px;
`
