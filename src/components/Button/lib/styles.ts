import { RequiredThemeProps } from '~/modules/theme'

type CreateCSSFromColorType = {
    base: string
    hovered: string
    activated: string
    text: string
    border?: string | null
}

export const createCSSFromColorType = ({
    base,
    hovered,
    activated,
    text,
    border = null
}: CreateCSSFromColorType) => {
    return `
        color: ${text};
        border: 1px solid ${border || base};
        background-color: ${base};
        &:hover {
            background-color: ${hovered};
            border-color: ${border || base};
            /* box-shadow */
        }
        &:active {
            background-color: ${activated};
            border-color: ${activated};
            box-shadow: none;
            outline: none;
        }
        &:focus {
            box-shadow: none;
            outline: none;
        }
    `
}

export const createCSSFromColorTypeSecondary = ({
    base,
    hovered,
    text,
    border = null
}: CreateCSSFromColorType) => {
    return `
        color: ${text};
        border: 1px solid ${border || base};
        background-color: ${base};
        &:hover {
            background-color: ${border};
            border-color: ${hovered};
            /* box-shadow */
        }
        &:active {
            background-color: ${hovered};
            border-color: ${hovered};
            box-shadow: none;
            outline: none;
        }
        &:focus {
            box-shadow: none;
            outline: none;
        }
    `
}

export const buttonBaseMixin = `
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: none;
    padding: 0;
    cursor: pointer;
    box-shadow: none;
    outline: none;
`

export const rippleEffectMixin = ({ theme }: { theme: RequiredThemeProps }) => `
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
    transition: background-color 0.2s, box-shadow 0.2s, border 0.2s;

    &:after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(
            circle,
            ${theme.colors.grayScale.S0} 10%,
            transparent 10.01%
        );
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform 0.2s, opacity 1s;
    }
    &:active:after {
        transform: scale(0, 0);
        opacity: 0.3;
        transition: 0s;
    }
`
