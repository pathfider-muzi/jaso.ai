import styled from "@emotion/styled";

export const Frame = styled.section<{
    height: number,
    width: number
}>`
     ${({ width, height }) => {
    return {
      width: width,
      height: height
    };
  }}
  margin-top:38px;
  padding: 5px;
  border: 1px solid black;
`;
