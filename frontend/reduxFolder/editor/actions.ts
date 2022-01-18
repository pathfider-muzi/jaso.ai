import { actions } from "./types";

export function setEditorContent(item: string) {
  return {
    type: actions.SET_TEXT,
    payload: item
  };
}
