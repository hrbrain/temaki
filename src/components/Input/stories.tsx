import { action } from '@storybook/addon-actions'
import { boolean, number, text } from '@storybook/addon-knobs'
import * as React from 'react'

import * as Input from './index'

export default {
    title: 'Components/Input'
}

export const Text = () => (
    <Input.Component
        format="text"
        value={text('Value', '')}
        placeholder={text('Placeholder', 'Enter your name')}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        errored={boolean('Error', false)}
        errorMessage={text('Error Message', 'Error Message')}
        onKeyDown={action('onKeyDown')}
        onKeyUp={action('onKeyUp')}
    />
)

export const Number = () => (
    <Input.Component
        format="number"
        unit={text('単位', '')}
        value={number('Value', 0)}
        placeholder={text('Placeholder', 'Enter your age')}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        errored={boolean('Error', false)}
        errorMessage={text('Error Message', 'Error Message')}
        onKeyDown={action('onKeyDown')}
        onKeyUp={action('onKeyUp')}
    />
)

export const NumberWithDecimalPlace = () => (
    <Input.Component
        format="number"
        unit={text('単位', '')}
        value={number('Value', 0)}
        placeholder={text('Placeholder', 'Enter your age')}
        disabled={boolean('disabled', false)}
        onChange={action('onChange')}
        onBlur={action('onBlur')}
        errored={boolean('Error', false)}
        errorMessage={text('Error Message', 'Error Message')}
        onKeyDown={action('onKeyDown')}
        onKeyUp={action('onKeyUp')}
        decimalPlace={number('小数点第', 0)}
    />
)
