export interface recommendedAnswerState {
  currentQuestionTitle: string;
}

export const ACTIONS_TYPE = {
  CHANGE_TITLE: "CHANGE_QUESITION_TITLE"
} as const;

interface ChangeQuestionTitleAction {
  type: typeof ACTIONS_TYPE.CHANGE_TITLE;
  payload: string;
}

export type RecommededAnswerActionTypes = ChangeQuestionTitleAction;
