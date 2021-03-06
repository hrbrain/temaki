import * as React from 'react'
import { ContainerType } from '~/types/utils'

import * as Input from '../index'

//------------------------------------------------------------------------------
// Utils
//------------------------------------------------------------------------------

const useChangeNumberValueFromChangeEvent = (
    onChange: ((value: Input.NumberValue) => void) | undefined,
    onChangeNative:
        | ((e: React.ChangeEvent<HTMLInputElement>) => void)
        | undefined,
    decimalPlace?: number | null
) =>
    React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            e.persist()
            if (onChangeNative) {
                onChangeNative(e)
            }
            if (onChange) {
                // tgtValueが空文字列, -, .が含まれる値の場合,
                // number以外の値を入れたいので as any を付けて強制的に代入している

                const tgtValue = e.target.value
                if (tgtValue === '') {
                    onChange('' as any)
                    return
                }

                if (tgtValue === '-') {
                    onChange(tgtValue as any)
                    return
                }

                const num = Number(tgtValue)
                if (isNaN(num)) {
                    return
                }

                if (decimalPlace && decimalPlace > 0) {
                    if (tgtValue.endsWith('.')) {
                        onChange(tgtValue.replace(/[^0-9.-]/g, '') as any)
                        return
                    }

                    onChange(Number(num.toFixed(decimalPlace)))
                    return
                }

                onChange(num)
            }
        },
        [onChange, onChangeNative, decimalPlace]
    )
const useBlurNumberValueFromFocusEvent = (
    value: number | string,
    onChange:
        | ((value: Input.NumberValue | Input.StringValue) => void)
        | undefined,
    onBlur: ((e: React.FocusEvent<HTMLInputElement>) => void) | undefined
) =>
    React.useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            if (onBlur) {
                onBlur(e)
            }
            // 値がnullableな場合valueを空文字へ、`.`で終わる場合はvalueを数字のvalueへする
            if (onChange) {
                const numberValue = Number(value)
                const isNullableValue = value === '' || isNaN(numberValue)
                if (isNullableValue) {
                    onChange('')
                    return
                }
                if (value.toString().endsWith('.')) {
                    onChange(numberValue)
                    return
                }
            }
        },
        [onChange, onBlur, value]
    )

//------------------------------------------------------------------------------
// Component
//------------------------------------------------------------------------------

type Props = {
    value: number | string
    onChange?: (value: Input.NumberValue | Input.StringValue) => void
    onChangeNative?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    decimalPlace?: number | null
}
type InjectProps = {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    value?: Input.StringValue
}
export const Container: ContainerType<Props, InjectProps> = ({
    Presenter,
    value,
    onChange,
    onChangeNative,
    decimalPlace,
    onBlur,
    ...props
}) => {
    const changeValue = useChangeNumberValueFromChangeEvent(
        onChange,
        onChangeNative,
        decimalPlace
    )

    const blurValue = useBlurNumberValueFromFocusEvent(value, onChange, onBlur)

    return (
        // @ts-ignore 型推論がうまくいってない
        <Presenter
            value={value.toString()}
            onChange={changeValue}
            onBlur={blurValue}
            {...props}
        />
    )
}
