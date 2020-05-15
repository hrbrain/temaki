import * as React from 'react'
import styled from '~/modules/theme'

import * as ClickOutside from '~/modules/ClickOutside'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'
import * as ItemList from '../ItemList'
import * as ErrorMessage from '~/components/lib/FormErrorMessage'

/*
 * Component
 */
type Props = {
    items: ItemList.Item[]
    value: ItemList.Value
    onClick: (e: React.MouseEvent) => void
    onClickOutside: () => void
    onClickMenuItem: (value: ItemList.Value) => void
    isError?: boolean
    isMenuVisible: boolean
    showTextBySelected: (
        items: ItemList.Item[],
        selected: ItemList.Value
    ) => string
    width?: string
    diff?: boolean
    className?: string
    errorMessage?: string
    searchValue: string
    onChangeSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlurSearchValue: () => void
}
export const Component = React.memo<Props>(props => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useEffect(() => {
        if (inputRef.current && props.isMenuVisible) inputRef.current.focus()
    }, [props.isMenuVisible])

    return (
        <Wrap width={props.width} className={props.className}>
            <Inner>
                <ClickOutside.Component
                    onClickOutside={props.onClickOutside}
                    inactive={!props.isMenuVisible}
                >
                    <Body
                        data-test="body"
                        isMenuVisible={props.isMenuVisible}
                        isError={props.isError}
                        onClick={props.onClick}
                        diff={props.diff}
                    >
                        <DropDownIcon
                            className={props.isMenuVisible ? 'visible' : ''}
                            svg={IconFiles.icons.DropdownOff}
                            size="24px"
                        />
                        {props.isMenuVisible ? (
                            <SelectorInput>
                                {props.showTextBySelected(
                                    props.items,
                                    props.value
                                )}
                                <Input
                                    data-test="input"
                                    type="text"
                                    value={props.searchValue}
                                    onChange={props.onChangeSearchValue}
                                    ref={inputRef}
                                />
                            </SelectorInput>
                        ) : (
                            <Text data-test="text">
                                {props.showTextBySelected(
                                    props.items,
                                    props.value
                                )}
                            </Text>
                        )}
                    </Body>
                    <StyledItemList
                        value={props.value}
                        searchValue={props.searchValue}
                        onClickItem={props.onClickMenuItem}
                        items={props.items}
                        isVisible={props.isMenuVisible}
                        onBlurSearchValue={props.onBlurSearchValue}
                    />
                </ClickOutside.Component>
            </Inner>
            <ErrorMessage.Component
                message={props.errorMessage}
                errored={props.isError}
            />
        </Wrap>
    )
})

/**
 * Styles
 */

const Wrap = styled.div<{ width?: string }>`
    width: ${props => props.width || '100%'};
`

const Inner = styled.div`
    position: relative;
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

type BodyType = {
    isMenuVisible?: boolean
    isError?: boolean
    diff?: boolean
}

const Body = styled.div<BodyType>`
    min-height: 40px;
    display: flex;
    padding: 8px 12px;
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

const StyledItemList = styled(ItemList.Component)<{ isVisible: boolean }>`
    position: absolute;
    left: 0;
    width: 100%;
    transition: all 0.2s;
    transform-origin: top;
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

const Text = styled.div`
    padding-right: 4px;
    width: calc(100% - 28px);
`

const SelectorInput = styled.div`
    padding-right: 4px;
    width: calc(100% - 28px);
    transition: border-color 0.15s;
    outline: 0;
    &.focused {
        border-color: ${props =>
            props.theme.colors.utilities.highlightGreen.default};
    }
`

const Input = styled.input`
    width: 100%;
    border: none;
    background: none;
    &:focus {
        outline: 0;
    }
`
