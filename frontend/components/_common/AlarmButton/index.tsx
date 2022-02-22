import { Props as ButtonProps } from "@/components/_common/Button";
import Image from "next/image";
import * as S from "./styles";
interface Props extends ButtonProps {
  unReadAlarmCount: number;
}

const AlarmButton = ({ unReadAlarmCount, ...props }: Props) => {
  return (
    <S.Frame unReadAlarmCount={unReadAlarmCount} {...props}>
      <Image src="/alarm.png" alt="alarm icon" width="100%" height="100%" layout="responsive" objectFit="contain" />
    </S.Frame>
  );
};

export default AlarmButton;
