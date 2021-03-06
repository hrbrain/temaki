import * as React from 'react';
declare type Props = {
    onChange?: (file: File | null) => void;
    fileName: string | null;
    accept?: string;
    width?: string;
    className?: string;
    errored?: boolean;
    errorMessage?: string;
    borderColorType?: BorderColorType;
};
export declare const Component: React.NamedExoticComponent<Props>;
declare type BorderColorType = 'primary' | 'grayScaleS100';
export {};
