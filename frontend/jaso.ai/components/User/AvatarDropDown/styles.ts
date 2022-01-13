import DropDownOptionComponent from "@/components/_common/DropDownOption";
import styled from "@emotion/styled";

export const Frame = styled.div`
  position: relative;
`;

export const AvatarWrapper = styled.button`
  width: fit-content;
  height: fit-content;
`;

export const DropDownOption = styled(DropDownOptionComponent)`
  position: absolute;
  top: 2.5rem;
  left: -2.5rem;
`;
