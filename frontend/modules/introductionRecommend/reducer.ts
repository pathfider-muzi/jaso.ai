import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import * as actions from "./actions";
import ACTION_TYPES from "./actionTypes";

export interface IntroductionRecommendState {
  title: string;
}

export type IntroductionRecommendActions =
  | ReturnType<typeof actions[keyof typeof actions]>
  | {
      type: typeof HYDRATE;
      payload: IntroductionRecommendState;
    };

const initialState: IntroductionRecommendState = {
  title: ""
};

export default function introductionRecommendReducer(
  state = initialState,
  action: IntroductionRecommendActions | AnyAction
): IntroductionRecommendState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ACTION_TYPES.SET_INTRODUCTION_TITLE:
      return {
        title: action.payload.title
      };
    default:
      return state;
  }
}
