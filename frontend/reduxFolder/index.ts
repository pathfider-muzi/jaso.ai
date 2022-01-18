import { combineReducers } from "redux";
import editorReducer from "./editor/reducer";

export const rootReducer = combineReducers({
  editorReducer
});

export type RootState = ReturnType<typeof rootReducer>;
