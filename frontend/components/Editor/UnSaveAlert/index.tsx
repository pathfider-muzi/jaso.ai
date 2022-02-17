import _CustomAlert from "@/components/_common/CustomAlert";
import { RootState } from "@/modules";
import { changeAlertState, changeSavedState } from "@/modules/confirmSaveIntroduction/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

  const saveAndClose = async () => {
    saveIntroduction();
    closeAndGoToNextPage();
  };

  useEffect(() => {}, [dispatch]);

  const closeAndGoToNextPage = () => {
    const wrappedPromise = (dispatch: any) =>
      new Promise<void>(async resolve => {
        dispatch(changeAlertState(false));
        dispatch(changeSavedState(true));
        resolve();
      });

    // setTimeOUt 을 쓰지 않고 react query 실행 될때까지 기다리는 방법 못찾음
    // promise 써도 안됨..
    wrappedPromise(dispatch).then(() => {
      setTimeout(() => {
        router.push(nextLink);
      }, 1000);
    });
  };

  const saveOrNotUI = (
    <S.ButtonsFrame>
      <S.Button onClick={saveAndClose}>예</S.Button>
      <S.Button onClick={closeAndGoToNextPage}>아니오</S.Button>
    </S.ButtonsFrame>
  );

  return (
    <_CustomAlert
      title="자소서 저장이 안되있습니다. 저장하고 이동하시겠습니까? 아니면 저장안하고 이동하시겠습니까?"
      contentNode={saveOrNotUI}
      isOpened={isAlertOpened}
    />
  );
};

export default UnSaveAlert;
