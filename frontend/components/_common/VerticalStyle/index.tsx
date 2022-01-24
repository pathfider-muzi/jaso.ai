import styled from "@emotion/styled";

// 컴포넌트화하기.
const VerticalStyle = styled.div<{
  width: number;
  marginLeft?: number;
  minHeight?: number;
}>`
  ${({ width, marginLeft, minHeight }) => {
    return {
      width: width,
      marginLeft: marginLeft,
      minHeight: minHeight
    };
  }}
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: -20px;
  flex-direction: column;
`;

export default VerticalStyle;
