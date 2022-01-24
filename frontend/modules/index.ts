import { combineReducers } from "redux";
import introductionRecommendReducer from "./introductionRecommend/reducer";
import introductionSpellCheckReducer from "./spellCheck/reducer";

const rootReducer = combineReducers({
  introductionSpellCheckReducer: introductionSpellCheckReducer,
  introductionRecommendReducer: introductionRecommendReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
