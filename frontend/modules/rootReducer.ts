import { combineReducers } from "redux";
import editorReducer from "./editor/reducer";

const rootReducer = combineReducers({
  editorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
