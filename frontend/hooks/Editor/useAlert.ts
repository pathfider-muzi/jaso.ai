import { RootState } from "@/modules";
import { changeAlertState, setNextLink } from "@/modules/confirmSaveIntroduction/actions";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const useCustomAlert = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const introducitonSavedState = useSelector((state: RootState) => state.confirmSavingIntroductionReducer);

  const isCustomAlertShouldOpen = (): boolean => {
    return introducitonSavedState.isInIntroductionPage === true && introducitonSavedState.isSaved === false;
  };

  const tryOpenCustomAlert = (nextLink: string) => {
    dispatch(setNextLink(nextLink));

    if (isCustomAlertShouldOpen()) {
      dispatch(changeAlertState(true));
      return;
    }
    router.push(nextLink);
  };

  return tryOpenCustomAlert;
};

export default useCustomAlert;
