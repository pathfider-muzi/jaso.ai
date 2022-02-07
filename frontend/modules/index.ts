import { combineReducers } from "redux";
import confirmSavingIntroductionReducer from "./confirmSaveIntroduction/reducer";
import introductionRecommendReducer from "./introductionRecommend/reducer";
import introductionSpellCheckReducer from "./spellCheck/reducer";

const rootReducer = combineReducers({
  introductionSpellCheckReducer: introductionSpellCheckReducer,
  introductionRecommendReducer: introductionRecommendReducer,
  confirmSavingIntroductionReducer: confirmSavingIntroductionReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
