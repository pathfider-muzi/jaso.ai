import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { ACTIONS_TYPE } from "./types";
import * as actions from "./actions";

export interface RecommendedAnswerOfQuestionState {
  currentQuestionTitle: string;
}

export type RecommededAnswerOfQuestionActions =
  | ReturnType<typeof actions[keyof typeof actions]>
  | {
      type: typeof HYDRATE;
      payload: RecommendedAnswerOfQuestionState;
    };

const initialState: RecommendedAnswerOfQuestionState = {
  currentQuestionTitle: ""
};

export default function recommendedAnswerOfQuestionReducer(
  state = initialState,
  action: AnyAction
): RecommendedAnswerOfQuestionState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ACTIONS_TYPE.CHANGE_TITLE:
      return { ...state, currentQuestionTitle: action.payload.title };
    default:
      return state;
  }
}
