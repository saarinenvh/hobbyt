import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./containers/App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";
import {
  getSubCategories,
  getCategories,
  getSuperCategories
} from "./actions/categories";
import { getOrganizations } from "./actions/organizations";
import { getActivities } from "./actions/activities";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.js";

import { BrowserRouter, BrowserHistory } from "react-router-dom";

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(getSubCategories());
store.dispatch(getSuperCategories());
store.dispatch(getCategories());
store.dispatch(getActivities());
store.dispatch(getOrganizations());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
