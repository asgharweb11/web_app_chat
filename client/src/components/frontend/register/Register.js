import React , {useState , useEffect} from "react";
import {useSelector , useDispatch} from "react-redux";
// import {Link} from "react-router-dom";
import {SetAlert , RemoveAlert} from "../../../actions/Alert"
import { v4 as uuidv4 } from 'uuid';
import {
    Container,
    Grid,
    Typography,
    ButtonGroup,
    Button,
    TextField
} from "@material-ui/core"
import {createMuiTheme , ThemeProvider , makeStyles , StylesProvider, jssPreset} from "@material-ui/core/styles";
import rtl from 'jss-rtl';
import { create } from 'jss';
import {validateEmail} from "../methodsMe"

import "../../../style/register.css"
import img from "../../../img/register/background.jpg"
import {Login_Post} from "../../../actions/auth"

// import {GetUser} from "../../methodAction/auth"


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme({
    direction: 'rtl',
    typography : {
        fontFamily : "yekan"
    }
})


const useStyle = makeStyles(theme => ({
    main : {
        position : "fixed",
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundImage : `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat : "no-repeat"
    },
    submit : {
        height: "70px",
        background: 'linear-gradient(0deg, rgb(70, 122, 243) 0%, rgb(141, 155, 255) 100%)',
        color: 'white',
        fontSize: "25px",
        "&:hover" : {
            background: 'linear-gradient(0deg, rgb(62, 106, 208) 0%, rgb(101, 120, 255) 100%)',
        }
    }
    
}) );

const Register = (props) => {

    let location = props.location.pathname;
    const classes = useStyle();

    const Alert = useSelector(state => state.Alert);
    const Auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        if(Auth.authenticator){
            props.history.push("/");
        }

    } , [Auth.authenticator , props.history])




    const [name , setName] = useState('');
    const [lastName , setLastName] = useState('');
    const [email , setEmail] = useState('');
    const [pass , setPass] = useState('');
    const [pass2 , setPass2] = useState('');

    const [nameErr , setNameErr] = useState(false);
    const [lastNameErr , setLastNameErr] = useState(false);
    const [emailErr , setEmailErr] = useState(false);
    const [passErr , setPassErr] = useState(false);

    let lastAlert = Alert[Alert.length - 1] ? Alert[Alert.length - 1] : false;

    if(lastAlert && lastAlert.page !== "register"){
        lastAlert = false;
    }
        
    const Login = (event) => {
        let value = event.target.textContent;
        if(location === "/register" && value === "لاگین"){
            props.history.push("/login");
        }else if(location === "/login" && value === "ثبت نام"){
            /* props.history.push("/register");*/
        }
    }



    const handleSubmit =  (e) => {
        e.preventDefault();

        const id = uuidv4();

        
        if(name.length <= 2){
            dispatch(SetAlert(id , "لطفا فیلد نام رو با دقت چک کنید" , "error" , "register"));
            setTimeout(() => {
                dispatch(RemoveAlert(id))
            }, 60000);
            setNameErr(true);
        }
        else if(lastName.length <= 2){
            dispatch(SetAlert(id , "لطفا فیلد نام خانوادگی رو با دقت چک کنید" , "error" , "register"));
            setTimeout(() => {
                dispatch(RemoveAlert(id))
            }, 60000);
            setLastNameErr(true)
        }
        else if(!validateEmail(email)){
            dispatch(SetAlert(id , "لطفا فیلد ایمیل رو با دقت چک کنید" , "error" , "register"));
            setTimeout(() => {
                dispatch(RemoveAlert(id))
            }, 60000);
            setEmailErr(true)
        }
        else if(pass !== pass2 || pass.length <= 4){
            dispatch(SetAlert(id , "لطفا فیلدهای پسورد رو با دقت چک کنید" , "error" , "register"));
            setTimeout(() => {
                dispatch(RemoveAlert(id))
            }, 60000);
            setPassErr(true);
        }
        else {

            dispatch(SetAlert(id , "لطفا صبور باشید ..." , "inherit" , "register"));

            const data = {
                name,
                last_name : lastName,
                email,
                password : pass
            }
            const headers = {
                "Content-Type" : "application/json"
            }

            fetch("/register" , {
                method : "POST",
                headers,
                body : JSON.stringify(data)
            }).then((res) => {
                let p = Promise.resolve(res.json());
                p.then(function(v) {

                    const data = {
                        name : v.name,
                        last_name : v.last_name,
                        email : v.email,
                        token : v.token
                    }


                    if(v.error){
                        dispatch(SetAlert(id , v.error , "error" , "register"));
                    } else{
                        localStorage.setItem("token" , v.token)
                        dispatch(Login_Post(data))
                        props.history.push("/");
                    }
                
                });
            })
            .catch((error) => {
                SetAlert(id , "خطای سرور ..." , "error" , "register")
            });
        }


        
    }
    return (
        <StylesProvider jss={jss}>
            <ThemeProvider theme={theme} >
                <Container className={classes.main} component="div" fixed>
                    <Grid className="BoxLarge" container direction="row" justify="center" alignItems="center" spacing={10}>
                        <Grid className="Box BoxForm" item xs={10} md={6} lg={5}>
                            <Grid className="DetailForm" container direction="row" justify="center" spacing={3}>
                                <Grid className="Btn" item xs={12}>
                                    <ButtonGroup color="primary">
                                        <Button onClick={Login} className="btnActiveLR">ثبت نام</Button>
                                        <Button onClick={Login}>لاگین</Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <form action="" noValidate autoComplete="off">
                                        <Grid className="InputsFrom" container direction="row" justify="center" alignItems="center" spacing={3}>
                                            <Grid item xs={12}>
                                                <Typography variant="h5" gutterBottom>ثبت نام</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid className="flexBetween" justify="space-between" container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField error={nameErr} fullWidth name="name" label="نام" value={name} onChange={e => {setName(e.target.value);setNameErr(false)}} variant="outlined"/>
                                                    </Grid>
                                                    <Grid style={{textAlign:"left"}} item xs={6}>
                                                        <TextField error={lastNameErr} fullWidth name="last_name" label="نام خانوادگی" value={lastName} onChange={e => {setLastName(e.target.value);setLastNameErr(false)}} variant="outlined" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField error={emailErr} fullWidth name="email" label="ایمیل" value={email} onChange={e => {setEmail(e.target.value);setEmailErr(false)}} variant="outlined"/>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container justify="space-between" className="flexBetween" spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField error={passErr} fullWidth label="پسورد" value={pass} onChange={e => {setPass(e.target.value);setPassErr(false)}} variant="outlined"/>
                                                    </Grid>
                                                    <Grid style={{textAlign:"left"}} item xs={6}>
                                                        <TextField error={passErr} fullWidth label="تکرار پسورد" value={pass2} onChange={e => {setPass2(e.target.value);setPassErr(false)}} variant="outlined" />
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button className={classes.submit} onClick={handleSubmit} variant="outlined" color="primary" size="large" fullWidth >ثبت نام</Button>
                                            </Grid>

                                        </Grid>
                                    </form>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <Typography variant="subtitle1" align="center" color={lastAlert ? lastAlert.type : "error"} gutterBottom >{lastAlert ? lastAlert.msg : ""}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid className="Btn" item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" fullWidth>ورود با جیمیل</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" fullWidth>ورود با فیسبوک</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                
            </ThemeProvider>
        </StylesProvider>
        
    )
}

export default Register;