import Image from "next/image";
import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal = ({ isOpen, onClose, children, title }: Props) => {
  const [isDomContentLoaded, setIsDomContentLoaded] = useState(false);

  const onClickCloseButton: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    setIsDomContentLoaded(true);
  }, []);

  return isOpen && isDomContentLoaded
    ? ReactDOM.createPortal(
        <S.Dimmed>
          <S.Frame>
            <S.ModalHeader>
              <S.ModalTitle>{title}</S.ModalTitle>
              <S.CloseButton type="button" onClick={onClickCloseButton}>
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
