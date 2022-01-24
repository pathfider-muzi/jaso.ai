import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import * as actions from "./actions";
import ACTION_TYPES from "./actionTypes";

export interface SpellCheckState {
  text: string;
}
export type SpellCheckActions =
  | ReturnType<typeof actions[keyof typeof actions]>
  | {
      type: typeof HYDRATE;
      payload: SpellCheckState;
    };

const initialState: SpellCheckState = {
  text: ""
};

export default function introductionSpellCheckReducer(
  state = initialState,
  action: SpellCheckActions | AnyAction
): SpellCheckState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ACTION_TYPES.SET_INTRODUCTION_CONTENT:
      return {
        text: action.payload.text
      };
    default:
      return state;
  }
}
