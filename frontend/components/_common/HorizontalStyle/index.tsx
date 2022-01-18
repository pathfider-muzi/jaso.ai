import styled from "@emotion/styled";

type widthProperty = "fit-content";

const HorizontalStyle = styled.div<{
  height: number;
  width?: number | widthProperty;
}>`
  ${({ height, width }) => {
    return {
      height: height.toString() + "vh",
      width: width
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
