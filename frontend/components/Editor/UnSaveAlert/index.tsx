import _CustomAlert from "@/components/_common/CustomAlert";
import { RootState } from "@/modules";
import { changeAlertState, changeSavedState } from "@/modules/confirmSaveIntroduction/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./styles";

interface Props {
  saveIntroduction: () => void;
}

const UnSaveAlert = ({ saveIntroduction }: Props) => {
  // const [isOpenedValue, setOpenedValue] = useState(isOpened);
  const isAlertOpened = useSelector((state: RootState) => state.confirmSavingIntroductionReducer.isAlertOpened);
  const dispatch = useDispatch();
  const router = useRouter();
  const nextLink = useSelector((state: RootState) => state.confirmSavingIntroductionReducer.nextLink);

  const saveAndClose = () => {
    saveIntroduction();
    closeAndGoToNextPage();
  };

  const closeAndGoToNextPage = () => {
    dispatch(changeAlertState(false));
    dispatch(changeSavedState(true));
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
      isOpened={isAlertOpened}
    />
  );
};

export default UnSaveAlert;
