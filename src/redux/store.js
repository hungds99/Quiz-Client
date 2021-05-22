import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { HostReducers, UIReducers, UserReducers } from "./reducers";
import { QuizReducers } from "./reducers/quizReducers";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  quiz: QuizReducers,
  host: HostReducers,
  user: UserReducers,
  UI: UIReducers,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export function getStore() {
  return store;
}

export default store;
