import DropDownOptionComponent from "@/components/_common/DropDownOption";
import { BOX_SHADOW } from "@/constants/styles/boxShadow";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }
`;

export const Export = styled.div`
  width: 80px;
  height: 30px;
  display: flex;
  flex-direction: row;
  box-shadow: ${BOX_SHADOW.BOLD};
  border-radius: 40%;
  margin-right: 8px;
`;

export const ExportText = styled.div`
  font-weight: bold;
  margin-top: 0rem;
  font-size: 15px;
`;

export const DropDownOption = styled(DropDownOptionComponent)`
  position: absolute;
  top: 1.3rem;
  left: 0;
  z-index: 4;
`;
