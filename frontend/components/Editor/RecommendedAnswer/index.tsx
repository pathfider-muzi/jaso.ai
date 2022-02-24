import reportLosuyAnswer from "@/api/reportAnswer";
import _CustomAlert from "@/components/_common/CustomAlert";
import Image from "next/image";
import { useState } from "react";
import * as S from "./styles";

interface Props {
  question: string;
  answer: string;
  tags: string[];
  id: number;
}

const RecommendedAnswer = ({ answer, question, tags, id }: Props) => {
  const [isCopyPasteAlertOpened, setOpened] = useState(false);

  const [isReportAlertOpened, setReportAlertOpened] = useState(false);

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
        <S.Answer>
          {"질문: " + question} <hr /> <br /> {answer}
        </S.Answer>
      </S.ContentWrapper>

      <S.CopyPaste>
        <Image src="/copy_paste_icon.png" alt="복붙" width="35" height="35" onClick={() => copyPaste(answer)} />
      </S.CopyPaste>
      <_CustomAlert isOpened={isCopyPasteAlertOpened} title={"선택한 자기소개서 문항이 복사되었습니다."} />
      <_CustomAlert isOpened={isReportAlertOpened} title={"해당 문항의 신고 처리가 정상적으로 접수되었습니다."} />

      <S.Footer>
        {tags.map(tag => {
          return <S.Tag key={tag}>{tag}</S.Tag>;
        })}
      </S.Footer>
      <S.ReportFrame>
        <S.ReportButton
          onClick={async () => {
            setReportAlertOpened(true);
            setTimeout(() => {
              setReportAlertOpened(false);
            }, 1000);
            await reportLosuyAnswer(id);
          }}
        >
          <S.FieldFrame>
            <S.ReportLetter>{"신고하기"}</S.ReportLetter>
          </S.FieldFrame>
        </S.ReportButton>
        <S.Label>
          <S.ToolTip
            text={"잘못된 문항이 추천되었다면 왼쪽 버튼을 눌러 신고하세요."}
            textBubbleStyle={{
              right: "0",
              bottom: "2rem"
            }}
          />
        </S.Label>
      </S.ReportFrame>
    </S.Frame>
  );
};

export default RecommendedAnswer;
