import * as S from "./styles";
import Image from "next/image";
import { useRef } from "react";
import { TextArea } from "../SelfIntroductionContent/styles";

interface Props {
  answer: string;
}

const RecommendedAnswer = ({ answer }: Props) => {
  const copyPaste = async (content: string) => {
    await navigator.clipboard.writeText(content);
    alert("선택한 자기소개서 문항이 복사되었습니다.");
  };

  return (
    <S.Frame>
      <S.Answer>{answer}</S.Answer>
      <S.CopyPaste>
        <Image src="/copy_paste_icon.png" alt="복붙" width="50" height="50" onClick={() => copyPaste(answer)} />
      </S.CopyPaste>
    </S.Frame>
  );
};

export default RecommendedAnswer;
