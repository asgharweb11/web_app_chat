const express = require("express");
const fileUpload = require("express-fileupload")
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const db = require("./config/db");
const morgan = require("morgan");

// ---------- models mongoose -----------
const User = require("./controller/model/users");
const Rooms = require("./controller/model/rooms");
const Messages = require("./controller/model/messages");

const router = require("./routes/router");
const auth = require("./routes/Auth/auth");
const register = require("./routes/Auth/register");
const UFChat = require("./routes/Chat/fileChat")
const message = require("./routes/Chat/message");
const rooms = require("./routes/Chat/rooms");
const getMessages = require("./routes/Chat/getMessage");

db();

const PORT = process.env.Port || 5000;

io.on("connection" , (socket) => {

    console.log("connect a user !!");




    socket.on("join" , async ({email , idchat} , callback) => {
        
        try {
            const getUser = await User.findOne({email})
            if(!getUser){
                callback({error : "کاربر در سیستم یافت نشد !!"});
            } else {
                const getRoom = await Rooms.find({user_id : getUser.id , idchat})

                if(!getRoom || getRoom.length === 0) {
                    const InRoom = await new Rooms({
                        user_id : getUser.id,
                        title : "Telegram",
                        avator : "",
                        iduser : "",
                        idchat,
                        room : "group"
                    })
                    await InRoom.save();
                    const text = `${getUser.name} به گروه پیوست`;
                    io.to(idchat).emit("GetMessage" , ({name : getUser.name , email , text , idfile : "" , type : "text" , room : idchat , status : "join"}))
                } 
                //console.log("hello")
                socket.join(idchat);
                callback();

            }
        } catch (error) {
            console.log("this is error : " , error)
        }
        
        
    })

    socket.on("SendMessage" , ({name , email , text , idfile , type , room} , callback) => {
        console.log(socket.rooms)
        if(!name || !email || !room || !text){
            callback({error : "this is Error Auth Or Text"});
        } else {
            io.to(room).emit("GetMessage" , ({name , email , text , idfile , type , room , status : "message"}))
            callback({done : "send Message"})
        }
        
    })
    
    socket.on("disconnect" , () => {
        console.log("disconnect a user !!");
    });
    
    
})

app.use(express.json());
app.use(fileUpload({
    createParentPath : true
}));
// app.use(morgan("dev"));


app.use('/' , router);
app.use('/auth' , auth);
app.use('/register' , register);
app.use("/UploadFileChat" , UFChat);
app.use("/getMessages" , getMessages);
app.use("/message" , message);
app.use("/rooms" , rooms);

http.listen(PORT , () => {console.log(`Server is On Port ${PORT} `)});