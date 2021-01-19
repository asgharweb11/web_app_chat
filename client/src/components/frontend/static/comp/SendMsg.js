import React , {useEffect , useState} from "react";
import {useSelector , useDispatch} from "react-redux"
import {v4 as uuidv4 } from "uuid"
import {JDate} from "j-date"
import io from "socket.io-client";
import {
    Grid,
    IconButton,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button
} from "@material-ui/core";

import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SendIcon from '@material-ui/icons/Send';
import 'emoji-mart/css/emoji-mart.css';
import { Picker} from 'emoji-mart';

// import {ChatMsg} from "../../../../Reducers/ChatMsg"
import {GetMsg} from "../../../../actions/ChatMsg"
import {PostData} from "../../methodsMe"
import pictuer from "../../../../img/avator/avator.jpg"



let socket;

const SendMsg = () => {

    const [status , setStatus] = useState(false);
    const [chosenEmoji , setChosenEmoji] = useState(["start"]);
    const [textarea , setTextarea] = useState(''); 
    const [cursor , setCursor] = useState({
        start : 0,
        end : 0
    });
    const [open , setOpen] = useState(false);
    const [file , setFile] = useState(null)

    const dispatch = useDispatch();
    const {name , email , room } = useSelector(state => state.auth)

    let iduser = "";

    const time = new Date().getTime();
    const H = new JDate(time).getHours()
    const M = new JDate(time).getMinutes()
    //const S = new JDate(time).getSeconds()

    const dateNow = H + ':' + M;

    useEffect(() => {
        socket = io("http://localhost:5000/");

        socket.emit("join" , ({email , idchat : room}) , res => {
            console.log("GET json")
        })

        socket.on("GetMessage" , ({name , email , text , idfile , type , room , status} , res) => {
            console.log("GeMessage : " , res)
            const id = uuidv4();
            const data = {
                id,
                email,
                name,
                photo : false,
                text,
                idfile,
                type,
                room,
                status,
                emojis : chosenEmoji,
                time : dateNow
            }
            dispatch(GetMsg(data)) 
        })

        return () => {
            socket.emit("disconnect");
            socket.off();
        }

    } , [email , room , chosenEmoji , dateNow , dispatch])


    


    const handleClose = () => {
        setOpen(false)
    }


    const onEmojiClick = (emojiObject) => {

        setChosenEmoji([
            ...chosenEmoji,
            emojiObject.colons
        ])
        
        const textarea = document.getElementById("inputChat");

        const FinText = textarea.value.substring(0 , cursor.start) + emojiObject.native +  textarea.value.substring(cursor.end)
        setTextarea(FinText)
        
    }

    const TogglePreview = () => {
        setStatus(!status);
    }

    const onChangeTextrea = e => {
        setTextarea(e.target.value)
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        setCursor({
            start,
            end
        })
    }

    const onClickTextarea = e => {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        setCursor({
            start,
            end
        })
    }

    const OnChangeUpload = (input) => {
        if(input.target.files && input.target.files[0]){
            setOpen(true)
            const reader = new FileReader()
            reader.onload = () => {
                let img = document.getElementById("UploadImg");
                img.src = reader.result;
            }
            reader.readAsDataURL(input.target.files[0])
            setFile(input.target.files[0])
        }
        //console.log(input.target.files)
    }


    const onClickSendMsg = (e) => {

        if(textarea !== null && textarea !== ""){
            e.preventDefault();

            const formData = new FormData();

            formData.append("name" , name);
            formData.append("email" , email)
            formData.append("text" , textarea);
            formData.append("room" , room);
            formData.append("iduser" , iduser);

            socket.emit("SendMessage" , {name , email , text : textarea , type : "text" , room , iduser} , async res => {
                if(res.status === false){
                    console.log(res.error)
                } else {
                    await PostData("/message" , "POST" , formData).then(data => {
                        console.log(data)
                    })

                    
                }
                setOpen(false)
            });
        }


    }

    const onClickSendFile = async (input) => {
        input.preventDefault()
        if(file){
            const formData = new FormData();

            formData.append("name" , name);
            formData.append("email" , email);
            formData.append("text" , textarea);
            formData.append("room" , room);
            formData.append("file" , file);
            
            await PostData("/UploadFileChat" , "POST" , formData).then(res => {
                console.log(res)
                if(res.status === false){
                    // ---------
                } else {
                    const {name , email , text , idfile , type , room} = res.data;
                    socket.emit("SendMessage" , {name , email , text , idfile , type , room , iduser} , data => {
                        setOpen(false)
                    });
                }
                    
            })
            
        }
    }

    return (
        <React.Fragment>
            <Grid container className="mainSendMsg">
                <Grid className="SendMsg" item xs={12}>
                    <div>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Upload Image</DialogTitle>
                            <DialogContent>
                                <img id="UploadImg" style={{width:"100%"}} src={pictuer} alt="Upload Image" />
                                <TextField id="inputChat" fullWidth rowsMax={5} value={textarea} onChange={onChangeTextrea} multiline placeholder="Send Message Text ..." />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={onClickSendFile} color="primary">ارسال</Button>
                                <Button onClick={handleClose} color="primary">لغو</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div>
                        <label>
                            <IconButton onClick={onClickSendMsg} className="IconSend" arai-label="emoji" component="span">
                                <SendIcon />
                            </IconButton>
                        </label>
                    </div>
                    <div className="Text">
                        <TextField id="inputChat" fullWidth rowsMax={5} value={textarea} onClick={onClickTextarea} onChange={onChangeTextrea} multiline placeholder="Send Message You ..." />
                    </div>
                    <div className="Tools">
                        <label htmlFor="upload-sendmsg">
                            <IconButton arai-label="upload image" component="span">
                                <PhotoCameraIcon />
                            </IconButton>
                        </label>
                        <label onClick={TogglePreview}>
                            <IconButton arai-label="emoji" component="span">
                                <EmojiEmotionsIcon />
                            </IconButton>
                        </label>
                        {status === true ? <Picker set="apple" onSelect={onEmojiClick} style={{position : 'absolute' , bottom : '110px' , right : '70px'}} /> : ""}
                        
                    </div>

                    
                    <input accept="image/*" id="upload-sendmsg" type="file" onChange={OnChangeUpload}/>
                    
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SendMsg;