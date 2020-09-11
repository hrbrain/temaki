/// <reference types="styled-components" />
import * as React from 'react';
import { RequiredThemeProps } from '~/modules/theme';
declare type Props = {
    defaultValue: number;
    step: number;
    min: number;
    max: number;
    unit: string;
    rate: number;
    onChangeValue: (value: number) => void;
    theme: RequiredThemeProps;
};
export declare const Component: React.ForwardRefExoticComponent<Pick<Props, "max" | "min" | "defaultValue" | "step" | "unit" | "rate" | "onChangeValue"> & {
    theme?: RequiredThemeProps | undefined;
}>;
export {};
