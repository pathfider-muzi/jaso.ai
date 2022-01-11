import styled from "@emotion/styled";
import PersonalInformationComponent from "@/components/User/PersonalInformation";

export const Frame = styled.div`
  display: flex;

  @media (max-width: 780px) {
    flex-direction: column;
  }
`;

export const PersonalInformation = styled(PersonalInformationComponent)`
  margin-right: 10px;

  @media (max-width: 780px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;
