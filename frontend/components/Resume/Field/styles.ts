import ToolTipComponent from "@/components/_common/ToolTip";
import styled from "@emotion/styled";

export const Frame = styled.div`
  width: 100%;
  display: flex;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.span`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  margin-right: 2rem;
  min-width: 10.6rem;
`;

export const ToolTip = styled(ToolTipComponent)`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 1rem;
  text-align: center;
  vertical-align: middle;
  width: 1.5rem;
  height: 1.5rem;
`;
