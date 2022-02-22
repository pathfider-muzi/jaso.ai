import Image from "next/image";
import * as S from "./styles";

const Notification = ({ ...props }) => {
  return (
    <S.Frame {...props}>
      <S.InputData>{"인풋"}</S.InputData>
      <S.DownArrowImageWrapper>
        <Image src="/down_arrow.png" alt="down arrow" width="70" height="50" />
      </S.DownArrowImageWrapper>
      <S.OutputData>{"아웃풋"}</S.OutputData>
    </S.Frame>
  );
};

export default Notification;
