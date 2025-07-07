import {createStore, combineReducers} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";

import {modalReducer} from "./modalReducer";

const rootReducer = combineReducers({
  multiModal: modalReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
