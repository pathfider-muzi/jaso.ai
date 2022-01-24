import AdditionalInformationContainerComponent from "@/components/User/AdditionalInformationContainer";
import PersonalInformationComponent from "@/components/User/PersonalInformation";
import ScreenComponent from "@/components/_layouts/Screen";
import styled from "@emotion/styled";

export const Screen = styled(ScreenComponent)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Frame = styled.div`
  display: flex;
  margin-top: 3rem;
  max-width: 780px;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

export const PersonalInformation = styled(PersonalInformationComponent)`
  margin-right: 10px;
  height: fit-content;

  @media (max-width: 780px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const AdditionalInformationContainer = styled(AdditionalInformationContainerComponent)`
  height: fit-content;
`;
