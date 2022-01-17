import Image from "next/image";
import React, { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title, ...props }: Props) => {
  const [isDomContentLoaded, setIsDomContentLoaded] = useState(false);

  const onClickCloseButton: MouseEventHandler<HTMLButtonElement> = event => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    setIsDomContentLoaded(true);
  }, []);

  useEffect(() => {
    document.body.style.setProperty("overflow", isOpen ? "hidden" : "revert");
  }, [isOpen]);

  return isOpen && isDomContentLoaded
    ? ReactDOM.createPortal(
        <S.Dimmed>
          <S.Frame {...props}>
            <S.ModalHeader>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.CloseButton onClick={onClickCloseButton}>
                <Image src="/close.png" alt="닫기버튼" width={24} height={24} />
              </S.CloseButton>
            </S.ModalHeader>
            <S.ModalBody>{children}</S.ModalBody>
          </S.Frame>
        </S.Dimmed>,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

export default Modal;
