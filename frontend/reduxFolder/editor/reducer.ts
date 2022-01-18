import { actions, EditorActionTypes, EditorState } from "./types";

const initialState: EditorState = {
  text: ""
};

export default function editorReducer(state = initialState, action: EditorActionTypes): EditorState {
  switch (action.type) {
    case actions.SET_TEXT:
      return {
        text: action.payload
      };
    default:
      return state;
  }
}
