import * as React from 'react'
import styled from '~/modules/theme'
import Highlighter from 'react-highlight-words'

import * as IconFiles from '~/lib/iconFiles'
import * as Icon from '~/components/Icon'

export type Value = string
export type Item = {
    label: string
    value: Value
    hierarchy: string
}
type Props = {
    items: Item[]
    selectedValues: string[]
    onClickItem: (changedValue: Value) => void
    searchValue: string
    className?: string
}

export const Component: React.FC<Props> = props => (
    <Wrap className={props.className}>
        {props.items.map(item => (
            <StyledItem
                item={item}
                key={item.value}
                selectedValues={props.selectedValues}
                onClickItem={props.onClickItem}
                searchValue={props.searchValue}
            />
        ))}
    </Wrap>
)

type ItemProps = {
    item: Item
    selectedValues: string[]
    onClickItem: (value: Value) => void
    searchValue: string
    className?: string
}

const Item: React.FC<ItemProps> = props => {
    const isSelected = React.useMemo(
        () => props.selectedValues.includes(props.item.value),
        [props]
    )

    const handleClick = React.useCallback(() => {
        props.onClickItem(props.item.value)
    }, [props.onClickItem, props.item])

    const svg = isSelected
        ? IconFiles.icons.CheckBoxOn
        : IconFiles.icons.CheckBoxOff

    return (
        <ItemWrap className={props.className}>
            <Li onClick={handleClick} data-test="item-clickArea">
                <CheckIcon svg={svg} size="24px" />
                <TextArea>
                    <Hierarchy>
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={[props.searchValue]}
                            autoEscape
                            highlightStyle={highlightStyle}
                            textToHighlight={props.item.hierarchy}
                        />
                    </Hierarchy>
                    <Label>
                        <Highlighter
                            highlightClassName="highlight"
                            searchWords={[props.searchValue]}
                            autoEscape
                            highlightStyle={highlightStyle}
                            textToHighlight={props.item.label}
                        />
                    </Label>
                </TextArea>
            </Li>
        </ItemWrap>
    )
}

// TODO: ハイライトのスタイル共通化
const highlightStyle: React.CSSProperties = {
    backgroundColor: '#FAF6CF',
    fontWeight: 'bold'
}

const StyledItem = styled(Item)``

const Wrap = styled.div`
    display: block;
    background: ${props => props.theme.colors.grayScale.S0};
    border-radius: 6px;
    box-shadow: ${props => props.theme.shadows.dropShadow.L5};
    max-height: 240px;
    overflow-y: auto;
    & > ${StyledItem} {
        margin-left: 12px;
    }
`

const ItemWrap = styled.ul`
    margin-left: 25px;
`

const Li = styled.li`
    list-style-type: none;
    user-select: none;
    font-size: 14px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 4px 0;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colors.primary.default};
    }
`

const CheckIcon = styled(Icon.Component)`
    & #fill {
        fill: ${props => props.theme.colors.main.primary[600]};
        & .disabled {
            fill: ${props => props.theme.colors.grayScale.S20};
        }
    }
`

const TextArea = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 4px;
`

const Hierarchy = styled.p`
    font-size: 12px;
`

const Label = styled.p`
    font-size: 14px;
`
