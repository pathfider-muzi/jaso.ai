import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore, Middleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { RootState } from "./rootReducer";

const middleWares: Middleware[] = [];

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middleWares))
    : composeWithDevTools(applyMiddleware(...middleWares));

export const makeStore = () => createStore(rootReducer, enhancer);

const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV !== "production"
});

export default wrapper;
