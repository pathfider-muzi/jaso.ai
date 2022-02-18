import _CustomAlert from "@/components/_common/CustomAlert";
import Image from "next/image";
import { useState } from "react";
import * as S from "./styles";

interface Props {
  question: string;
  answer: string;
  tags: string[];
}

const RecommendedAnswer = ({ answer, question, tags }: Props) => {
  const [isAlertOpened, setOpened] = useState(false);

  const copyPaste = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setOpened(true);

    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };

  return (
    <S.Frame>
      <S.ContentWrapper>
        <S.Answer>{"질문: " + question + "\n" + answer}</S.Answer>
      </S.ContentWrapper>

      <S.CopyPaste>
        <Image src="/copy_paste_icon.png" alt="복붙" width="35" height="35" onClick={() => copyPaste(answer)} />
      </S.CopyPaste>
      <_CustomAlert isOpened={isAlertOpened} title={"선택한 자기소개서 문항이 복사되었습니다."} contentNode={<></>} />
      <S.Footer>
        {tags.map(tag => {
          return <S.Tag key={tag}>{tag}</S.Tag>;
        })}
      </S.Footer>
    </S.Frame>
  );
};

export default RecommendedAnswer;
