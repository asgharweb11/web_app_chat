import React , {useEffect} from 'react';
import {useSelector , useDispatch} from "react-redux";
// import {Login} from "../../../../actions/auth"
// import { Emoji } from 'emoji-mart'
import {
    Grid,
    Typography,
} from "@material-ui/core";
import {v4 as uuidv4 } from "uuid"

import 'react-perfect-scrollbar/dist/css/styles.css';

import SendMsg from "./SendMsg";
// Moduls
import PerfectScrollbar from 'react-perfect-scrollbar'
// --- upload file
// import upload from "../../files/upload.jpg"
// import { borderRadius } from '@material-ui/system';
// get pictuers
import avator from "../../../../img/avator/avator.jpg";
// -------- methods
import {PostData} from "../../methodsMe/index"
//--------- Actions 
import {GetMsg} from "../../../../actions/ChatMsg"


const BoxChat = () => {

    const Auth = useSelector(state => state.auth);
    const Msg = useSelector(state => state.Msg);
    const dispatch = useDispatch()


    useEffect(() => {
        // ------ PostData
        async function msg(){
            const formData = new FormData();

            formData.append("idchat" , Auth.room);
            formData.append("email" , Auth.email)
            // formData.append("iduser" , Auth.iduser)

            const data = await PostData("/getMessages" , "POST" , formData);

            if(data.status === true){

                data.data.map(res => {
                    const {name , email , text , idfile , type , date} = res;
                    const id = uuidv4();
                    const dataMsg = {
                        id,
                        email,
                        name,
                        photo : false,
                        text,
                        idfile,
                        type,
                        room : 100100000,
                        status : "file",
                        emojis : "",
                        time : date
                    }
                    dispatch(GetMsg(dataMsg))
                    //console.log(dataMsg)
                })

                //dispatch(GetMsg(dataMsg))
            }
            
            // console.log("data : " , data)
            //return data
        }

        msg()

    } , [PostData , Auth.room])
    

    return (
        <Grid item className="BoxChatUserGroup" lg={9} md={8} xs={7}>
            <PerfectScrollbar className="ScrollChat">
                {
                    Msg.map((data , index) => {
                        
                        const createMarkup = (text) => {

                            let ChangeText = text.replace("<", "");
                            ChangeText = ChangeText.replace("</", "");
                            ChangeText = ChangeText.replace(">", "");
                            ChangeText = ChangeText.replace(/\n|\r\n|\r/g, "<br>");
                            ChangeText = ChangeText.replace("[b]", "<b>");
                            ChangeText = ChangeText.replace("[/b]", "</b>");
                            
                            
                            return {__html : ChangeText} 
                        }

                        //const img = import("../../files/rooms/" + data.idfile);
                        console.log(data)
                        return (

                            <div key={index}>
                                {
                                    data.status === "join" ?
                                        <Grid container justify="center">
                                            <Grid item>
                                                <div className="PmChat" style={{textAlign : "center"}}>
                                                    <div className="Join" >{data.text}</div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    :
                                        <Grid container justify={data.email === Auth.email ? "flex-start" : "flex-end"} >
                                            <Grid item className={`PmChat ${data.email === Auth.email ? "PmYou" : "PmUser flexDirection"}`} >
                                                <div className="profile">
                                                    <img src={avator} alt="avator" />
                                                </div>
                                                <div className={`detail ${data.email === Auth.email ? "detailYou" : "detailUser"}`}>
                                                    <div className="name">
                                                        <Typography variant="subtitle2" gutterBottom>{data.name}</Typography>
                                                    </div>
                                                    {
                                                        data.idfile ? 
                                                            <div className="file">
                                                                <img src={`files/rooms/${data.idfile}`} alt="pictuer" />
                                                            </div>
                                                        : ""
                                                        
                                                    }
                                                    <div className="TextUser" style={data.idfile ? {borderRadius : "0px 0px 5px 5px"} : {borderRadius : "5px"}}>
                                                        <div dangerouslySetInnerHTML={createMarkup(data.text)} style={{fontSize : "13px" , display : "table-cell" , maxWidth : "650px"}} /> 
                                                    </div>
                                                    <div className="datePm">
                                                        <Typography variant="caption" display="block" gutterBottom>{data.time}AM</Typography>
                                                    </div>
                                                </div>

                                            </Grid>
                                        </Grid>
                                }
                                
                            </div>
                        )
                    })
                }

                

                {/* <Grid item className="PmChat PmUser" xs={10}>
                    <div className="TextUser">
                        <Typography variant="body2" gutterBottom>In publishing <br/><br/> and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content</Typography>
                    </div>
                    <div className="datePm">
                        <Typography variant="caption" display="block" gutterBottom>12:30pm</Typography>
                    </div>
                </Grid> */}
            
            </PerfectScrollbar>
            <SendMsg />
        </Grid>
    )
}

export default BoxChat;