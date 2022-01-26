import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.div`
  ${BORDER.GRAY_150};
  border-radius: 10px;
  width: 100%;
  padding: 1rem;

  & > *:not(:last-child) {
    border-bottom: 1px solid ${PALETTE.GRAY_150};
    margin-bottom: 0.5rem;
  }
`;

export const Header = styled.div`
  width: 100%;
  ${verticalStyle};
`;

export const Title = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

export const ContentWrapper = styled.div`
  overflow-y: scroll;
  height: 15rem;
`;

export const Content = styled.span``;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.div`
  min-width: 3rem;
  width: fit-content;
  padding: 0.5rem;
  background-color: ${PALETTE.VIOLET};
  color: ${PALETTE.WHITE};
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  font-size: 0.8rem;
`;
