import ACTION_TYPES from "./actionTypes";

export const setEditorContent = (text: string) => {
  return {
    type: ACTION_TYPES.SET_TEXT,
    payload: {
      text
    }
  };
};
