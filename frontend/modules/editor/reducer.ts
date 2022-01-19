import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import * as actions from "./actions";
import ACTION_TYPES from "./actionTypes";

export interface EditorState {
  text: string;
}
export type EditorActions =
  | ReturnType<typeof actions[keyof typeof actions]>
  | {
      type: typeof HYDRATE;
      payload: EditorState;
    };

const initialState: EditorState = {
  text: ""
};

export default function editorReducer(state = initialState, action: EditorActions | AnyAction): EditorState {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case ACTION_TYPES.SET_TEXT:
      return {
        text: action.payload.text
      };
    default:
      return state;
  }
}
