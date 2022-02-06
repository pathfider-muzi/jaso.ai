import _CustomAlert from "@/components/_common/CustomAlert";
import { useRouter } from "next/router";
import { ChangeEventHandler, MouseEventHandler, ReactEventHandler, useEffect, useState } from "react";
import * as S from "./styles";

interface Props {
  saveIntroduction: () => void;
  isOpened: boolean;
  nextLink: string;
}

const UnSaveAlert = ({ saveIntroduction, isOpened, nextLink }: Props) => {
  const [isOpenedValue, setOpenedValue] = useState(isOpened);
  const router = useRouter();

  useEffect(() => {
    setOpenedValue(isOpened);
  }, [isOpened]);

  const saveAndClose = () => {
    saveIntroduction();
    closeAndGoToNextPage();
  };

  const closeAndGoToNextPage = () => {
    setOpenedValue(false);
    router.push(nextLink);
  };

  const saveOrNotUI = (
    <S.ButtonsFrame>
      <S.Button onClick={saveAndClose}>예</S.Button>
      <S.Button onClick={closeAndGoToNextPage}>아니오</S.Button>
    </S.ButtonsFrame>
  );

  return (
    <_CustomAlert
      title="자소서 저장이 안되있습니다. 저장하시겠습니까?"
      contentNode={saveOrNotUI}
      isOpened={isOpenedValue}
    />
  );
};

export default UnSaveAlert;
