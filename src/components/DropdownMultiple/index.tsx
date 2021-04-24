import * as React from 'react'
import styled from '~/modules/theme'

import * as Body from './body'
import * as ItemList from './itemList'

import * as ClickOutside from '~/modules/ClickOutside'
import * as ErrorMessage from '~/components/lib/FormErrorMessage'

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------

export type Item = ItemList.Item

type Props = {
    items: ItemList.Item[]
    values: ItemList.Value[]
    onChange: (value: ItemList.Value[]) => void
    onClickRemove?: (index: number) => void
    width?: string
    placeholder?: string
    disabled?: boolean
    isError?: boolean
    diff?: boolean
    defaultExpanded?: boolean
    className?: string
    errorMessage?: string
}

export const Component = React.memo<Props>(props => {
    const [isMenuVisible, setIsMenuVisible] = React.useState(
        props.defaultExpanded
    )

    const [searchValue, setSearchValue] = React.useState<string>('')

    const changeSearchValue = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchValue(event.target.value)
        },
        [searchValue]
    )

    const clickBody = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        setIsMenuVisible(true)
    }, [])

    const clickOutside = React.useCallback((e: React.MouseEvent<unknown>) => {
        e.preventDefault()
        setIsMenuVisible(false)
        setSearchValue('')
    }, [])

    const clickIcon = React.useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            setIsMenuVisible(!isMenuVisible)
        },
        [isMenuVisible]
    )

    const changeValue = React.useCallback(
        (value: ItemList.Value) => {
            if (props.values.includes(value)) {
                const newValues = props.values.filter(x => x !== value)
                props.onChange(newValues)
            } else {
                const newValues = [...props.values, value]
                props.onChange(newValues)
            }
        },
        [props.values, props.onChange]
    )

    const filteredItems = React.useMemo(() => {
        const items = props.items.filter(item =>
            item.text.includes(searchValue)
        )
        return items
    }, [searchValue, props.items])

    const keyDownInInput = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (e.keyCode === 8 && searchValue === '') {
                const slicedItem = props.values.slice(0, -1)
                props.onChange(slicedItem)
            }
        },
        [props.values, searchValue, props.onChange]
    )

    const noop = () => {}

    return (
        <Wrap className={props.className} width={props.width}>
            <Inner>
                <ClickOutside.Component
                    onClickOutside={clickOutside}
                    inactive={!isMenuVisible}
                >
                    <Body.Component
                        onClick={!props.disabled ? clickBody : noop}
                        items={props.items}
                        values={props.values}
                        placeholder={props.placeholder}
                        isMenuVisible={isMenuVisible}
                        diff={props.diff}
                        disabled={props.disabled}
                        isError={props.isError}
                        onChangeSearchValue={changeSearchValue}
                        onClickRemove={props.onClickRemove}
                        searchValue={searchValue}
                        onKeydown={keyDownInInput}
                        onClickIcon={!props.disabled ? clickIcon : noop}
                    />
                    {filteredItems.length ? (
                        <StyledItemList
                            isVisible={isMenuVisible}
                            items={filteredItems}
                            onClickItem={changeValue}
                            values={props.values}
                            searchValue={searchValue}
                        />
                    ) : (
                        <NotFoundText isVisible={isMenuVisible}>
                            &quot;{searchValue}&quot;が見つかりませんでした。
                        </NotFoundText>
                    )}
                </ClickOutside.Component>
            </Inner>
            <ErrorMessage.Component
                errored={props.isError}
                message={props.errorMessage}
            />
        </Wrap>
    )
})

Component.displayName = 'DropdownMultiple'

//------------------------------------------------------------------------------
// Styles
//------------------------------------------------------------------------------

const Wrap = styled.div<{ width?: string }>`
    width: ${props => props.width || '100%'};
`

const Inner = styled.div`
    position: relative;
`

const StyledItemList = styled(ItemList.Component)<{ isVisible?: boolean }>`
    width: 100%;
    position: absolute;
    right: 0;
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

const NotFoundText = styled.div<{ isVisible?: boolean }>`
    display: ${props => (props.isVisible ? 'block' : 'none')};
    position: absolute;
    right: 0;
    width: 100%;
    background: ${props => props.theme.colors.grayScale.S0};
    border-radius: 6px;
    box-shadow: ${props => props.theme.shadows.dropShadow.L5};
    max-height: 204px;
    overflow-y: auto;
    z-index: 1;
    color: ${props => props.theme.colors.grayScale.S50};
    word-break: break-all;
    padding: 12px;
    margin-top: 6px;
`
