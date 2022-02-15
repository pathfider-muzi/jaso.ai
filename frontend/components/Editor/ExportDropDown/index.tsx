import { Option as DropDownOptionType } from "@/components/_common/DropDownOption";
import * as S from "./styles";
import Image from "next/image";
import { Qna } from "@/types/Qna";
import jsPDF from "jspdf";
import { MALGUN_FONT_BASE_64 } from "@/constants/fontBase64";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  qnas: Qna[];
  title: string;
  currentAnswer: string;
  currentQuestion: string;
  currentIndex: number;
}

const ExportDropDown = ({
  isOpen,
  onToggle,
  qnas,
  title,
  currentQuestion,
  currentAnswer,
  currentIndex: curIndex
}: Props) => {
  const options: DropDownOptionType[] = [
    {
      label: "pdf",
      onClick: () => {
        let newIntroduction = new jsPDF("p", "pt");
        newIntroduction.addFileToVFS("malgun.ttf", MALGUN_FONT_BASE_64);
        newIntroduction.addFont("malgun.ttf", "malgun", "normal");
        newIntroduction.setFont("malgun");
        newIntroduction.setFontSize(11);

        let qnasContent = "";

        qnas.forEach((qna: Qna, index) => {
          if (index === curIndex) {
            qnasContent += `${index + 1}. ${currentQuestion}\n`;
            qnasContent += "\n";
            qnasContent += currentAnswer;
          } else {
            qnasContent += `${index + 1}. ${qna.question}\n`;
            qnasContent += "\n";
            qnasContent += qna.answer;
          }
          qnasContent += "\n";
        });

        let linebreakedContents = newIntroduction.splitTextToSize(qnasContent, 500);
        newIntroduction.text(linebreakedContents, 10, 10);
        newIntroduction.save(`${title}.pdf`);
      }
    },
    {
      label: "docx",
      onClick: () => {}
    }
  ];

  return (
    <S.Frame>
      <S.Export onClick={onToggle}>
        <Image src="/file_export.png" alt="내보냄" width="23" height="23"></Image>
        <S.ExportText>내보내기</S.ExportText>
      </S.Export>
      {isOpen && <S.DropDownOption options={options}></S.DropDownOption>}
    </S.Frame>
  );
};

export default ExportDropDown;
