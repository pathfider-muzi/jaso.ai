export interface EditorState {
  text: string;
}

export const actions = {
  SET_TEXT: "SET_TEXT" as const
};

interface SetTextAction {
  type: typeof actions.SET_TEXT;
  payload: string;
}

export type EditorActionTypes = SetTextAction;
