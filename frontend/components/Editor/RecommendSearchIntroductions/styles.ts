import ButtonComponent from "@/components/_common/Button";
import ScreenComponent from "@/components/_layouts/Screen";
import BORDER from "@/constants/styles/border";
import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";

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
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  margin: 1rem 0;
  font-size: 3rem;
  margin-left: 10px;
  font-weight: bold;
  white-space: pre;
  background-image: linear-gradient(90deg, ${PALETTE.VIOLET}, ${PALETTE.HOT_PINK});
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const DetailExplanation = styled.div`
  margin-top: 10px;
  color: ${PALETTE.BLACK_900};
  font-size: 18px;
  margin-left: 10px;
  font-weight: 900;
`;

export const SearchBarFrame = styled.div`
  width: 100%;
  gap: 1rem;
  display: flex;
  justify-items: center;
  align-items: center;

  margin: 1rem 0;
`;

export const SearchInput = styled.input`
  ${BORDER.GRAY_300}
  padding: 1rem;
  border-radius: 10px;
  width: 300px;
  height: 50px;
`;

export const SearchButton = styled(ButtonComponent)`
  background-color: ${PALETTE.VIOLET};
  color: ${PALETTE.WHITE};
  font-weight: 900;

  font-size: 1rem;
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
  font-size: 14px;
  margin-top: 10px;
  height: 60px;
`;

export const CompanyNameMeta = styled.div`
  min-width: 260px;
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
  cursor: pointer;
  border-top: 1px solid ${PALETTE.GRAY_150};
  border-bottom: 1px solid ${PALETTE.GRAY_200};
  align-self: center;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;

  transition: all 0.3s ease;
  &:hover {
    background-color: ${PALETTE.GRAY_150};
  }
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

export const NoSearchResult = styled.div`
  align-self: center;
  font-weight: border;
  font-size: 20px;
`;
