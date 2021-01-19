const express = require("../../node_modules/express");
const router = express.Router();
const User = require("../../controller/model/users");
const Rooms = require("../../controller/model/rooms");
const Message = require("../../controller/model/messages");

router.post("/" , async (req , res) => {
    try {
        const {idchat , email } = req.body;

        const FindUser = await User.findOne({email});

        if(!FindUser){
            return res.json({
                status : false,
                msg : "کاربر مورد نظر یافت نشد"
            })
        }

        const FindRoom = await Rooms.findOne({user_id : FindUser.id , idchat});

        if(!FindRoom){
            return res.json({
                status : true,
                msg : "شما هنوز یه گروه یا افرادی که میشناسید پیامی ارسال نکرده اید !!"
            });
        }
        /// room_id : FindRoom.id
        console.log(FindRoom.id)
        const FindMsg = await Message.find({idchat : FindRoom.idchat});

        const SetMsg = FindMsg.map(data => {
            return {
                name : data.name,
                email : data.email,
                text : data.text,
                idfile : data.idfile,
                type : data.type,
                date : data.date
            }
        })

        //console.log(SetMsg)

        return res.json({
            status : true,
            msg : "Done",
            data : SetMsg
        });  
    } catch (error) {
        console.log("this is error : " , error)
    }
    
});

module.exports = router;