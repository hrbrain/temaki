import * as React from 'react';
import * as ItemList from '../ItemList';
declare type Props = {
    items: ItemList.Item[];
    value: ItemList.Value;
    onClick: (e: React.MouseEvent) => void;
    onClickOutside: () => void;
    onClickMenuItem: (value: ItemList.Value) => void;
    isError?: boolean;
    isMenuVisible: boolean;
    showTextBySelected: (items: ItemList.Item[], selected: ItemList.Value) => string;
    width?: string;
    diff?: boolean;
    className?: string;
    errorMessage?: string;
    searchValue: string;
    onChangeSearchValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlurSearchValue: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    icons?: {
        file: string;
        size: string;
    };
};
export declare const Component: React.NamedExoticComponent<Props>;
export {};
