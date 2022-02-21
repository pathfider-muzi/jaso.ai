import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

export const Frame = styled.div`
  width: 100%;
  flex-direction: column;
  max-width: 80vw;
  min-width: 60rem;
`;

export const SearchBarFrame = styled.div`
  margin-top: 200px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  margin-bottom: 40px;
`;

export const SearchInput = styled.input`
  background-color: white;
  border-radius: 10%;
  width: 300px;
  height: 30px;
  border: 1px solid ${PALETTE.GRAY_150};
`;

export const SearchButton = styled.input`
  background-color: ${PALETTE.VIOLET};
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
