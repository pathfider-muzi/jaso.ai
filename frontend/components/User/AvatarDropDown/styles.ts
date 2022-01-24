import DropDownOptionComponent from "@/components/_common/DropDownOption";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
  z-index: 1;
`;

export const AvatarWrapper = styled.button`
  width: fit-content;
  height: fit-content;
`;

export const DropDownOption = styled(DropDownOptionComponent)`
  position: absolute;
  top: 3.5rem;
  left: -2rem;
`;
