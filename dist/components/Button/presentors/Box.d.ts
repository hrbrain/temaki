import * as React from 'react';
import * as Index from '../index';
declare type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type: 'submit' | 'reset' | 'button';
    className: string | undefined;
    dataTest: string | undefined;
} & OuterProps;
export declare const Component: React.FC<Props>;
declare type OuterProps = {
    height?: string;
    width?: string;
    colorType: Index.BoxColorTypeProp;
};
export {};
