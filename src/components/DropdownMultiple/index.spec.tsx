import * as Enzyme from 'enzyme'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { mountWithTheme } from '~/__test__/utils'
import * as DropdownMultiple from './index'
import * as ItemList from './itemList'
import * as Theme from '~/modules/theme'
import 'jest-styled-components'

describe('Dropdown(Multi)コンポーネントのテスト', () => {
    let wrapper: Enzyme.ReactWrapper
    let mockOnChange: jest.Mock
    let items: ItemList.Item[]

    beforeEach(() => {
        mockOnChange = jest.fn()
        items = [
            { value: '1', text: 'りんご' },
            { value: '2', text: 'いちご' },
            { value: '3', text: 'バナナ' },
            { value: '4', text: 'メロン' },
            { value: '5', text: 'さくらんぼ' },
            { value: '6', text: 'ぶどう' }
        ]
        act(() => {
            wrapper = mountWithTheme(
                <DropdownMultiple.Component
                    placeholder="placeholder"
                    items={items}
                    values={[]}
                    disabled={false}
                    defaultExpanded={true}
                    isError={false}
                    width="250px"
                    onChange={mockOnChange}
                />
            )
        })
    })

    it('コンポーネントが定義されている', () => {
        expect(wrapper).toBeDefined()
    })

    it('StateのisVisibleによってul要素が見え隠れする', () => {
        expect(wrapper.find('ul[data-test="itemList"]')).toHaveStyleRule(
            'visibility',
            'visible'
        )
        wrapper.find('div[data-test="body"]').simulate('click')
        expect(wrapper.find('ul[data-test="itemList"]')).toHaveStyleRule(
            'visibility',
            'visible'
        )
    })

    it('StateのisVisibleがtrueの時、borderが緑になっている', () => {
        wrapper.find('div[data-test="body"]').simulate('click')
        expect(wrapper.find('div[data-test="body"]')).toHaveStyleRule(
            'border',
            '1px solid rgb(114,206,92)'
        )
    })

    it('disabledがtrue時に灰色になる', () => {
        wrapper = mountWithTheme(
            <DropdownMultiple.Component
                placeholder="placeholder"
                items={items}
                values={[]}
                disabled={true}
                isError={false}
                width="250px"
                onChange={mockOnChange}
            />
        )
        expect(wrapper.find('div[data-test="body"]')).toHaveStyleRule(
            'background-color',
            'rgb(214,214,214)'
        )
    })

    it('エラー時にborderが赤になっている', () => {
        wrapper = mountWithTheme(
            <DropdownMultiple.Component
                placeholder="placeholder"
                items={items}
                values={[]}
                disabled={false}
                isError={true}
                width="250px"
                onChange={mockOnChange}
            />
        )
        expect(wrapper.find('div[data-test="body"]')).toHaveStyleRule(
            'border',
            '1px solid rgb(224,85,72)'
        )
    })

    it('リストが選択されていない時に、placeholderが本体に表示されている', () => {
        wrapper = mountWithTheme(
            <DropdownMultiple.Component
                placeholder="placeholder"
                items={items}
                values={[]}
                disabled={false}
                isError={true}
                width="250px"
                onChange={mockOnChange}
            />
        )
        expect(wrapper.find('div[data-test="text"]').text()).toBe('placeholder')
    })

    it('選択されたリストがある時に、本体に表示されている', () => {
        wrapper = mountWithTheme(
            <DropdownMultiple.Component
                placeholder="placeholder"
                items={items}
                values={['1', '2']}
                disabled={false}
                isError={true}
                width="250px"
                onChange={mockOnChange}
            />
        )
        expect(wrapper.find('div[data-test="text"]').text()).toBe(
            'りんごいちご'
        )
    })

    it('ドロップダウンの中身がクリックされた時にonClickItemが呼ばれる', () => {
        act(() => {
            wrapper.find('div[data-test="body"]').simulate('click')
            wrapper
                .find('li')
                .first()
                .simulate('click')
            expect(mockOnChange).toHaveBeenCalled()
        })
    })

    it('Diffの時に色が変わるか', () => {
        act(() => {
            wrapper = mountWithTheme(
                <DropdownMultiple.Component
                    placeholder="placeholder"
                    items={items}
                    values={[]}
                    isError={false}
                    width="250px"
                    diff={true}
                    onChange={mockOnChange}
                />
            )

            const el = wrapper.find('div[data-test="body"]')
            expect(el).toHaveStyleRule(
                'background-color',
                Theme.defaultTheme.colors.utilities.paleYellow.replace(/ /g, '')
            )
        })
    })

    it('Diffの時に色が変わるか', () => {
        act(() => {
            wrapper = mountWithTheme(
                <DropdownMultiple.Component
                    placeholder="placeholder"
                    items={items}
                    values={[]}
                    disabled={true}
                    isError={false}
                    width="250px"
                    diff
                    onChange={mockOnChange}
                />
            )

            const el = wrapper.find('div[data-test="body"]')
            expect(el).toHaveStyleRule(
                'background-color',
                Theme.defaultTheme.colors.utilities.paleYellow.replace(/ /g, '')
            )
        })
    })
})
