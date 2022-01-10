import styled from "@emotion/styled";

export const Frame = styled.header`
  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BrandInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BrandName = styled.h1`
  font-weight: 900;
  font-size: 20px;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
  vertical-align: top;
`;

export const ButtonsWrapper = styled.div`
  & > button:last-child {
    margin-left: 1rem;
  }
`;
