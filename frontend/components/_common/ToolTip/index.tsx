import useModal from "@/hooks/useModal";
import { ReactNode } from "react";
import * as S from "./styles";

export interface Props {
  text: string;
  textBubbleStyle: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  };
  children?: ReactNode;
}

const ToolTip = ({ text, textBubbleStyle, children, ...props }: Props) => {
  const { isModalOpen, openModal, closeModal } = useModal({ defaultValue: false });

  return (
    <S.Frame {...props}>
      <S.Button type="button" onMouseOver={openModal} onMouseOut={closeModal}>
        {children ? children : <>{"?"}</>}
      </S.Button>
      {isModalOpen && <S.SpeechBubble textBubbleStyle={textBubbleStyle}>{text}</S.SpeechBubble>}
    </S.Frame>
  );
};

export default ToolTip;
