import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const Frame = styled.button<{color: string, textColor: string}>`
    ${({color, textColor}) => {
        return {
            backgroundColor: color,
            color: textColor
        }
    }
    }
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 40px;
    right: 10px;
    font-size: 20px;
    font-weight: bold;
    box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.08);

    &:focus {
        background-color: white;
        color: red;
    }
`;
