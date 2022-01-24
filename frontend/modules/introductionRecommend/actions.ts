import ACTION_TYPES from "../spellCheck/actionTypes";

export const setIntroductionTitle = (title: string) => {
  return {
    type: ACTION_TYPES.SET_INTRODUCTION_CONTENT,
    payload: {
      title
    }
  };
};
