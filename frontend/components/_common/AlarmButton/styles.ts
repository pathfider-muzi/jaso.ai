import PALETTE from "@/constants/styles/palette";
import styled from "@emotion/styled";
import ButtonComponent from "../Button";

const MAX_UNREAD_ALARM_COUNT = 9;

export const Frame = styled(ButtonComponent)<{
  unReadAlarmCount: number;
}>`
  padding: 0;
  margin: 10px;
  width: 1.7rem;
  height: 2rem;
  border: none;
  box-shadow: none;
  position: relative;

  &:hover:enabled {
    box-shadow: none;
  }

  &::after {
    font-weight: 700;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    width: 1rem;
    height: 1rem;
    background-color: ${PALETTE.RED};
    border-radius: 50%;
    position: absolute;
    color: ${PALETTE.WHITE};
    content: "${({ unReadAlarmCount }) => {
      if (unReadAlarmCount > MAX_UNREAD_ALARM_COUNT) return `${MAX_UNREAD_ALARM_COUNT}+`;

      return unReadAlarmCount;
    }}";
  }
`;
