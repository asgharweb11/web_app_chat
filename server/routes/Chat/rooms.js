const express = require("../../node_modules/express");
const router = express.Router();
const User = require("../../controller/model/users"); 
const Rooms = require("../../controller/model/rooms");

router.post("/" , async (req , res) => {
    const {email} = req.body;
    const FindUser = await User.findOne({email})

    if(!FindUser){
        return res.json({
            status : false,
            msg : "کاربر مورد نظر یافت نشد"
        })
    }

    const FindRoom = await Rooms.findOne({user_id : FindUser.id})

    if(!FindRoom){
        return res.json({
            status : false,
            msg : "شما هنوز عضو هیچ گروهی نشده اید !!"
        })
    }
    console.log("title2 : " , FindRoom.title)
    return res.json({
        status : true,
        msg : "Done",
        data : {
            title : FindRoom.title,
            avator : FindRoom.avator,
            idchat : FindRoom.idchat,
            room : FindRoom.room
        }
        
    })
})

module.exports = router;