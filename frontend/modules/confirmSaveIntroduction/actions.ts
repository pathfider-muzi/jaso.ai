import { ACTIONS_TYPE } from "./types";

export const changeSavedState = (isSaved: boolean) => {
  return {
    type: ACTIONS_TYPE.CHANGE_SAVED_STATE,
    payload: {
      isSaved
    }
  };
};

export const changePageState = (isInIntroductionPage: boolean) => {
  return {
    type: ACTIONS_TYPE.CHANGE_PAGE,
    payload: {
      isInIntroductionPage
    }
  };
};

export const changeAlertState = (isAlertOpened: boolean) => {
  return {
    type: ACTIONS_TYPE.CHANGE_ALERT_STATE,
    payload: {
      isAlertOpened
    }
  };
};

export const setNextLink = (nextLink: string) => {
  return {
    type: ACTIONS_TYPE.SET_NEXT_LINK,
    payload: {
      nextLink
    }
  };
};
