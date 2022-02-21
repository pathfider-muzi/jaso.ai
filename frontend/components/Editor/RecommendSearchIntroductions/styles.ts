import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import ScreenComponent from "@/components/_layouts/Screen";
import BORDER from "@/constants/styles/border";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  width: 100%;
  flex-direction: column;
  max-width: 80vw;
  min-width: 60rem;
`;

export const TopForm = styled.form`
  width: 100%;
  height: 200px;
  background-color: purple;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  margin-top: 10px;
  color: white;
  font-size: 24px;
  margin-left: 10px;
  font-weight: bold;
`;

export const SearchBarFrame = styled.div`
  margin-top: 30px;
  margin-left: 5px;
  display: flex;
  align-self: center;
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
  border-radius: 2%;
  width: 300px;
  height: 50px;
  border: none;
`;

export const SearchButton = styled.button`
  background-color: ${PALETTE.VIOLET};
  margin-left: 20px;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchResultsFrame = styled.div`
  display: flex;
  flex-direction: vertical;
  width: 100%;
`;
export const MetaInfoForResult = styled.div`
  border-top: 1px solid black;
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  height: 60px;
`;

export const CompanyNameMeta = styled.div`
  min-width: 130px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
`;
export const JobMeta = styled.div`
  min-width: 180px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-all;
  white-space: pre-wrap;
`;

export const SpecAndIntroductionMeta = styled.div`
  vertical-align: middle;
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResultContentFrame = styled.div`
  border-top: 1px solid ${PALETTE.GRAY_150};
  border-bottom: 1px solid ${PALETTE.GRAY_200};
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;
`;

export const LoadingImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ShowMoreButton = styled.button`
  width: 100%;
  padding: 0.5rem 0;
  text-align: center;
  transition: all 0.1s linear;
  margin-top: 20px;
  border-radius: 10px;
  ${BORDER.GRAY_150};

  &:hover {
    background-color: ${PALETTE.GRAY_150};
  }
`;
