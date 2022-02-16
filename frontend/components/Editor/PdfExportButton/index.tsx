import { MALGUN_FONT_BASE_64 } from "@/constants/fontBase64";
import { Qna } from "@/types/Qna";
import jsPDF from "jspdf";
import Image from "next/image";
import * as S from "./styles";

interface Props {
  title: string;
  qnas: Qna[];
}

const PdfExportButton = ({ qnas, title, ...props }: Props) => {
  const onClickExportIcon = () => {
    const newIntroduction = new jsPDF("p", "pt");
    newIntroduction.addFileToVFS("malgun.ttf", MALGUN_FONT_BASE_64);
    newIntroduction.addFont("malgun.ttf", "malgun", "normal");
    newIntroduction.setFont("malgun");
    newIntroduction.setFontSize(11);

    const qnasContent = qnas.reduce((acc, curr, index) => {
      acc += `${index + 1}. ${curr.question}\n\n`;
      acc += `${curr.answer}\n\n`;

      return acc;
    }, "");

    const linebreakedContents = newIntroduction.splitTextToSize(qnasContent, 500);
    newIntroduction.text(linebreakedContents, 10, 10);
    newIntroduction.save(`${title}.pdf`);
  };

  return (
    <S.Frame onClick={onClickExportIcon} {...props}>
      <Image src="/download.svg" alt="self introduction download icon" width="22" height="22" />
    </S.Frame>
  );
};

export default PdfExportButton;
