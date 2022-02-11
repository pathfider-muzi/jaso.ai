export interface intorudctionSaveState {
  isSaved: boolean;
  isInIntroductionPage: boolean;
  isAlertOpened: boolean;
  nextLink: string;
}

export const ACTIONS_TYPE = {
  CHANGE_SAVED_STATE: "CHANGE_SAVED_STATE",
  CHANGE_PAGE: "CHANGE_PAGE_STATE",
  CHANGE_ALERT_STATE: "CHANGE_ALERT_STATE",
  SET_NEXT_LINK: "SET_NEXT_LINK"
} as const;

interface ChangeSetTextAction {
  type: typeof ACTIONS_TYPE.CHANGE_SAVED_STATE;
  payload: boolean;
}

interface ChangePageStateAction {
  type: typeof ACTIONS_TYPE.CHANGE_PAGE;
  payload: boolean;
}

interface ChangeAlertStateAction {
  type: typeof ACTIONS_TYPE.CHANGE_ALERT_STATE;
  payload: boolean;
}

interface SetNextLinkAction {
  type: typeof ACTIONS_TYPE.SET_NEXT_LINK;
  payload: string;
}

export type IntroductionSaveActionTypes =
  | ChangeSetTextAction
  | ChangePageStateAction
  | ChangeAlertStateAction
  | SetNextLinkAction;
