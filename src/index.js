import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import "./styles/index.css";
import './styles/main.scss'
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <Route
      render={routeProps => (
        <App {...routeProps}/>
      )}
      />
    </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
