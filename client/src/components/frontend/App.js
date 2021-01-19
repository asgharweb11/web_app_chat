
import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
// import {useSelector , useDispatch} from "react-redux";
import Static from "./static/Static";
import Register from "./register/Register";
import Login from "./login/Login";
// import {Logout , Login_Get} from "../../actions/auth"

// import {GetUser} from "../methodAction/auth"




export default function App(props) {


  // const dispatch = useDispatch()
  // const Auth = useSelector(state => state.auth);

  console.log("Page App")

  return (
      <Router>
        <Route exact path="/" component={Static} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
  )
}

