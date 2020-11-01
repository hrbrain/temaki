import * as React from 'react'
import styled, { RequiredThemeProps } from '~/modules/theme'

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
    disabled?: boolean
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
    placeholder?: string
    searchValue: string
    onChangeSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlurSearchValue: () => void
    onKeyDown: (event: React.KeyboardEvent) => void
}
export const Component = React.memo<Props>(props => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    React.useEffect(() => {
        if (inputRef.current && props.isMenuVisible) inputRef.current.focus()
    }, [props.isMenuVisible])

    const filteredItems = React.useMemo(() => {
        return props.items.filter(item => item.text.includes(props.searchValue))
    }, [props.searchValue, props.items])
    const noop = () => {}
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
                        onClick={!props.disabled ? props.onClick : noop}
                        disabled={props.disabled}
                        diff={props.diff}
                    >
                        {props.isMenuVisible ? (
                            <SelectorInput>
                                {props.showTextBySelected(
                                    props.items,
                                    props.value
                                )}
                                <Input
                                    data-test="input"
                                    type="text"
                                    disabled={props.disabled}
                                    placeholder={props.placeholder}
                                    value={props.searchValue}
                                    onChange={props.onChangeSearchValue}
                                    onKeyDown={props.onKeyDown}
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
                        <IconWrap
                            onClick={!props.disabled ? props.onClick : noop}
                        >
                            <DropdownIcon
                                className={props.isMenuVisible ? 'visible' : ''}
                                svg={IconFiles.icons.DropdownOff}
                                size="24px"
                            />
                        </IconWrap>
                    </Body>
                    {filteredItems.length ? (
                        <StyledItemList
                            value={props.value}
                            onClickItem={props.onClickMenuItem}
                            items={filteredItems}
                            isVisible={props.isMenuVisible}
                            onBlurSearchValue={props.onBlurSearchValue}
                        />
                    ) : (
                        <NotFoundText isVisible={props.isMenuVisible}>
                            &quot;{props.searchValue}
                            &quot;が見つかりませんでした。
                        </NotFoundText>
                    )}
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

const IconWrap = styled.div``

const DropdownIcon = styled(Icon.Component)`
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
    disabled?: boolean
}

const getBackgroundColor = (
    theme: RequiredThemeProps,
    diff?: boolean,
    disabled?: boolean
) => {
    if (disabled) {
        return theme.colorsOld.grayScale.S20
    }
    if (diff) {
        return theme.colorsOld.utilities.paleYellow
    } else {
        return 'inherit'
    }
}

const Body = styled.div<BodyType>`
    min-height: 40px;
    position: relative;
    display: flex;
    padding: 8px 12px;
    border: 1px solid
        ${props => {
            if (props.isError) {
                return props.theme.colorsOld.utilities.red.default
            }
            if (props.isMenuVisible) {
                return props.theme.colorsOld.utilities.highlightGreen.default
            }
            return props.theme.colorsOld.grayScale.S10
        }};
    border-radius: 6px;
    user-select: none;
    font-size: 14px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    background-color: ${props =>
        getBackgroundColor(props.theme, props.diff, props.disabled)};
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
            props.theme.colorsOld.utilities.highlightGreen.default};
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

const NotFoundText = styled.div<{ isVisible: boolean }>`
    display: ${props => (props.isVisible ? `block` : `none`)};
    position: absolute;
    right: 0;
    width: 100%;
    background: ${props => props.theme.colorsOld.grayScale.S0};
    border-radius: 6px;
    box-shadow: ${props => props.theme.shadows.dropShadow.L5};
    max-height: 204px;
    overflow-y: auto;
    z-index: 1;
    color: ${props => props.theme.colorsOld.grayScale.S50};
    word-break: break-all;
    padding: 12px;
    margin-top: 6px;
`
