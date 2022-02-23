import * as S from "./styles";
import Image from "next/image";
import { useState } from "react";
import _CustomAlert from "@/components/_common/CustomAlert";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  introductionContent: string;
  tags: string[];
}

const IntroductionDetailModal = ({ isOpen, onClose, introductionContent, tags }: Props) => {
  const [isAlertOpened, setOpened] = useState(false);

  const copyPaste = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setOpened(true);

    setTimeout(() => {
      setOpened(false);
    }, 1000);
  };

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
      <_CustomAlert isOpened={isAlertOpened} title={"선택한 자기소개서 문항이 복사되었습니다."} contentNode={<></>} />
      <S.Footer>
        {tags.map(tag => {
          return <S.Tag key={tag}>{tag}</S.Tag>;
        })}
      </S.Footer>
    </S.Frame>
  );
};

export default IntroductionDetailModal;