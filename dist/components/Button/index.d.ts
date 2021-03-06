import * as React from 'react';
export declare type ColorTypeProp = 'primary' | 'primary ghost' | 'secondary' | 'secondary ghost' | 'destructive' | 'destructive ghost' | 'disabled' | 'grayScaleS100' | 'default';
export declare type BoxColorTypeProp = ColorTypeProp;
export declare type CircleColorTypeProp = Extract<ColorTypeProp, 'primary' | 'secondary' | 'default'>;
export declare type TextColorTypeProp = Extract<ColorTypeProp, 'primary' | 'destructive' | 'default' | 'grayScaleS100'>;
export declare const buttonShapeType: {
    box: "box";
    circle: "circle";
    text: "text";
};
export declare type Props = {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    dataTest?: string;
} & ({
    variant: typeof buttonShapeType.box;
    colorType?: BoxColorTypeProp;
    height?: string;
    width?: string;
} | {
    variant: typeof buttonShapeType.circle;
    colorType?: CircleColorTypeProp;
    svg?: string;
} | {
    variant: typeof buttonShapeType.text;
    colorType?: TextColorTypeProp;
    svg?: string;
});
export declare const Component: React.FC<Props>;
