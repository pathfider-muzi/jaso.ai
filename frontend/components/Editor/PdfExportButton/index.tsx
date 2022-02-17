import Image from "next/image";
import * as S from "./styles";

interface Props {
  onClickPdfExportButton: () => void;
  styles: {
    width: number;
    height: number;
  };
}

const PdfExportButton = ({ onClickPdfExportButton, styles: { width, height }, ...props }: Props) => {
  return (
    <S.Frame onClick={onClickPdfExportButton} {...props}>
      <Image src="/download.svg" alt="self introduction download icon" width={`${width}`} height={`${height}`} />
    </S.Frame>
  );
};

export default PdfExportButton;
