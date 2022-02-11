import { ACTIONS_TYPE } from "./types";

export const changeQuestionTitleState = (title: string) => {
  return {
    type: ACTIONS_TYPE.CHANGE_TITLE,
    payload: {
      title
    }
  };
};
