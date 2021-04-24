import * as React from 'react';
declare type Props = {
    items: Item[];
    values: Value[];
    onClickItem: (value: Value) => void;
    className?: string;
    isVisible?: boolean;
    searchValue: string;
};
export declare const Component: React.NamedExoticComponent<Props>;
export declare type Item = {
    text: string;
    value: Value;
    remarks?: string;
};
export declare type Value = string;
export {};
