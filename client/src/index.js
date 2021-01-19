import React from "react";
import ReactDom from "react-dom";
import App from "./components/frontend/App";
import { createStore } from "redux";
import reducers from "./Reducers";
import {Provider} from "react-redux";


const Store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);




ReactDom.render(<Provider store={Store}><App /></Provider> , document.querySelector("#root"));