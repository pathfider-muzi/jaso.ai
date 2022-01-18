import styled from "@emotion/styled";

// 컴포넌트화하기.
const VerticalStyle = styled.div<{
  width: number;
  marginLeft?: number;
}>`
  ${({ width, marginLeft }) => {
    return {
      width: width,
      marginLeft: marginLeft
    };
  }}
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 30px;
  flex-direction: column;
`;

export default VerticalStyle;
