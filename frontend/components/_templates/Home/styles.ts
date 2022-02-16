import MainIntroductionComponent from "@/components/Introduction/MainIntroduction";
import StatisticsIntroductionComponent from "@/components/Introduction/StatisticsIntroduction";
import SubIntroductionComponent from "@/components/Introduction/SubIntroduction";
import SubIntroductionDetailComponent from "@/components/Introduction/SubIntroductionDetail";
import styled from "@emotion/styled";

export const MainIntroduction = styled(MainIntroductionComponent)`
  height: 50rem;
  color: white;
  position: relative;
`;

export const SubIntroduction = styled(SubIntroductionComponent)`
  padding: 11rem 0;
`;

export const SubIntroductionDetailWrapper = styled.div`
  width: 100%;
  margin: 11rem 0;
`;

export const SubIntroductionDetail = styled(SubIntroductionDetailComponent)`
  margin: 11rem 0;
`;

export const StatisticsIntroduction = styled(StatisticsIntroductionComponent)`
  margin: 11rem 0 2rem 0;
`;
