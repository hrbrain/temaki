import * as React from 'react';
import * as ItemList from './itemList';
/**
 * Component
 */
declare type Props = {
    items: ItemList.Item[];
    values: ItemList.Value[];
    onClick: () => void;
    placeholder?: string;
    isError?: boolean;
    width?: string;
    isMenuVisible?: boolean;
};
export declare const Component: React.NamedExoticComponent<Props>;
export {};
