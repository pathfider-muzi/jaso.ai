import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { ACTIONS_TYPE } from "./types";
import * as actions from "./actions";

export interface IntroductionConfirmState {
  isSaved: boolean;
  isInIntroductionPage: boolean;
  isAlertOpened: boolean;
  nextLink: string;
}

export type IntroductionConfirmActions =
  | ReturnType<typeof actions[keyof typeof actions]>
  | {
      type: typeof HYDRATE;
      payload: IntroductionConfirmState;
    };
const initialState: IntroductionConfirmState = {
  isSaved: true,
  isInIntroductionPage: false,
  isAlertOpened: false,
  nextLink: ""
};

export default function confirmSavingIntroductionReducer(
  state = initialState,
  action: AnyAction
): IntroductionConfirmState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ACTIONS_TYPE.CHANGE_PAGE:
      return { ...state, isInIntroductionPage: action.payload.isInIntroductionPage };
    case ACTIONS_TYPE.CHANGE_SAVED_STATE:
      return { ...state, isSaved: action.payload.isSaved };
    case ACTIONS_TYPE.CHANGE_ALERT_STATE:
      return { ...state, isAlertOpened: action.payload.isAlertOpened };
    case ACTIONS_TYPE.SET_NEXT_LINK:
      return { ...state, nextLink: action.payload.nextLink };
    default:
      return state;
  }
}
