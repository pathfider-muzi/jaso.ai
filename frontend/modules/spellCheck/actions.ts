import ACTION_TYPES from "./actionTypes";

export const setEditorContent = (text: string) => {
  return {
    type: ACTION_TYPES.SET_INTRODUCTION_CONTENT,
    payload: {
      text
    }
  };
};
