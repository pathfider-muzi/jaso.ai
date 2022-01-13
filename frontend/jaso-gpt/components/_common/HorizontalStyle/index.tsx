import styled from "@emotion/styled";

const HorizontalStyle = styled.div<{
  height: number;
}>`
  ${({ height }) => {
    return {
      height: height + "vh",
    };
  }}
  display: flex;
  margin-top: 30px;
  flex-direction: row;
  > {
    margin-right: 0px;
  }
`;

export default HorizontalStyle;
