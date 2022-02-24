import * as S from "./styles";
import Image from "next/image";
import { useState } from "react";
import _CustomAlert from "@/components/_common/CustomAlert";
import reportLosuyIntroduction from "@/api/reportIntroduction";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  introductionContent: string;
  tags: string[];
  id: number;
}

const IntroductionDetailModal = ({ isOpen, onClose, introductionContent, tags, id }: Props) => {
  const [isCopyPasteAlertOpened, setOpened] = useState(false);

  const copyPaste = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setOpened(true);

    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };

  const [isReportAlertOpened, setReportAlertOpened] = useState(false);

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="자기소개서 상세 내용">
      <S.IntroductionContent>{introductionContent}</S.IntroductionContent>
      <S.CopyPaste>
        <Image
          src="/copy_paste_icon.png"
          alt="복붙"
          width="35"
          height="35"
          onClick={() => copyPaste(introductionContent)}
        />
      </S.CopyPaste>
      <S.ReportButton
        onClick={async () => {
          setReportAlertOpened(true);
          setTimeout(() => {
            setReportAlertOpened(false);
          }, 1000);
          await reportLosuyIntroduction(id);
        }}
      >
        <S.FieldFrame>
          {"신고하기"}
          <S.Label>
            <S.ToolTip
              text={"잘못된 자기소개서가 추천되었다고 생각되시면 이 버튼을 눌러주세요."}
              textBubbleStyle={{
                left: "0",
                bottom: "2rem"
              }}
            ></S.ToolTip>
          </S.Label>
        </S.FieldFrame>
      </S.ReportButton>
      <_CustomAlert
        isOpened={isCopyPasteAlertOpened}
        title={"선택한 자기소개서 문항이 복사되었습니다."}
        contentNode={<></>}
      />
      <S.Footer>
        {tags.map(tag => {
          return <S.Tag key={tag}>{tag}</S.Tag>;
        })}
      </S.Footer>

      <_CustomAlert
        title="해당 답변의 신고 처리가 정상적으로 접수되었습니다."
        isOpened={isReportAlertOpened}
        contentNode={<></>}
      />
    </S.Frame>
  );
};

export default IntroductionDetailModal;
