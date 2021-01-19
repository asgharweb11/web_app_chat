const express = require("../../node_modules/express");
const router = express.Router();
const keygen = require("../../node_modules/keygen");
// Models ----------------
const Users = require("../../controller/model/users");
const Rooms = require("../../controller/model/rooms");
const Messages = require("../../controller/model/messages");

router.post("/" , async (req , res) => {
    if(!req.body){
        return res.send({
            status : false,
            msg : "No Data"
        })
    } 
    try {
        let type = "text";
        let idfile = keygen.url();
        let idchat = 100 + Math.floor(Math.random() * (100000000000 - 999999999999 + 1) + 100000000000)
        
        const {file} = req.files;
        const {name , email , text , room , iduser} = req.body;

        const split = file.name.split(".");
        const format = split[split.length - 1];

        const GetMe = await Users.findOne({email})
        //console.log(req.body , GetMe)
        if(!GetMe || !room){
            return res.json({error : "لطفا یکبار صفحه خود را تازه کنید !!"})
        } 
        
        if(format === "jpg" || "jpeg" || "image"){type = "photo"}
        else if(format === "avi" || "mp4"){type = "video"}

        
        let GetRoom = await Rooms.findOne({user_id : GetMe.id , idchat : room});


        if(iduser == ""){
            return res.json({error : "لطفا یکبار صفحه خود را تازه کنید ، گویا مشکلی پیش اومده !!"})
        } 
        
        if(!GetRoom && iduser != ""){
            const Me = await new Rooms({
                user_id : GetMe.id,
                title : "",
                avator : "",
                iduser,
                idchat,
                room : "person"
            }) 
            const User = await new Rooms({
                user_id : iduser,
                title : "",
                avator : "",
                iduser : GetMe.id,
                idchat,
                room : "person"
            }) 

            await Me.save();
            await User.save();
        }

        const InserMessage = await new Messages({
            room_id : GetRoom.idchat,
            user_id : GetMe.id,
            name : GetMe.name,
            email : GetMe.email,
            text,
            idfile : idfile + "." + format,
            type,
            idchat : GetRoom.idchat
        })

        if(!InserMessage){
            return res.json({error : "خطای سرور ، لطفا مجدد تلاش نمایید"});
        }

        await file.mv("../client/public/files/rooms/" + idfile + "." + format);
        
        await InserMessage.save();

        return res.json({
            status : true,
            data : {
                name,
                email,
                text,
                idfile : idfile + "." + format,
                type,
                room : GetRoom.idchat,
                status : "file"
            }
        })


        
    } catch (error) {
        res.status(500).send(error)
        console.log("error me : " , error)
    }
});

module.exports = router;