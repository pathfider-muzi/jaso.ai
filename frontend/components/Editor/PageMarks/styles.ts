import VerticalStyle from "@/components/_common/VerticalStyle";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Size} from ".";

const SIZE_INFO: {
    [key in Size]: ReturnType<typeof css>;
} = {
    sm: css`
        width: 8px;
        > * {
        margin-top: 3px;
        }
    `,
    md: css`
        width: 50px;
        > * {
        margin-top: 5px;
        }
    `,
    lg: css`
        width: 20px;
        > * {
        margin-top: 7px;
        }
    `
}

export const Frame = styled.div<{
    size: Size;
}>` ${({ size }) => {
        return SIZE_INFO[size];
    }} 
    ${VerticalStyle}
    min-height: 40px;
    z-index: 100;
    position: relative;
    top: 0px;
    margin-left: 55px;
    margin-top: 110px;
    height: fit-content;
`