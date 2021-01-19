import React , {useEffect} from 'react';
import {useSelector , useDispatch} from "react-redux";
// import io from "socket.io-client";
import {
  Container,
  Grid,
} from "@material-ui/core";
import {
  createMuiTheme, 
  ThemeProvider, 
  jssPreset, 
  StylesProvider
} from "@material-ui/core/styles"


import "../../../style/static.css";
import 'react-perfect-scrollbar/dist/css/styles.css';

import Navbar from './comp/Navbar';
import Header from './comp/Header';
import SubHeader from "./comp/SubHeader";
import NavListUsers from "./comp/NavListUsers";
import BoxChat from './comp/BoxChat';
import rtl from "jss-rtl";
import {create} from "jss";
import {Logout , Login_Get} from "../../../actions/auth"

import {GetUser} from "../../methodAction/auth"

const jss = create({ plugins : [...jssPreset().plugins , rtl()] });

const theme = createMuiTheme({
  typography: {
    fontFamily: 'yekan',
  },
});


// let socket;
export default function Static(props) {

  const Auth = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {

    async function get_user(){
      const data = await GetUser(localStorage.token)
      if(data.error){
        dispatch(Logout())
        props.history.push("/login");
      } else{
        dispatch(Login_Get(data.user))
      }
    }
    
    get_user()

    return () => {
      console.log("second text")
    }
    

  } , [Auth.name , dispatch , props.history])

  console.log("Static : " , Auth.authenticator)


  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxwidth="sm">
          <Navbar />
          <Header />
          <div className="BoxChatUserOrGroup">
            <SubHeader />
            <Grid container className="BoxUsersGroups">
              <NavListUsers />
              <BoxChat />
            </Grid>
          </div>
        </Container>
      </ThemeProvider>
    </StylesProvider>
      
  );
}