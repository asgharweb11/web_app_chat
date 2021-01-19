const express = require("../../node_modules/express");
const router = express.Router();
const User = require("../../controller/model/users");
const Rooms = require("../../controller/model/rooms");
const Messages = require("../../controller/model/messages");

router.post("/" , async (req , res) => {

    const {name , email , text , room , iduser} = req.body;
    let idchat = 100 + Math.floor(Math.random() * (100000000000 - 999999999999 + 1) + 100000000000)

    try {

        const FindUser = await User.findOne({email});
        if(!FindUser){
            return res.json({
                status : false,
                msg : "کاربر مورد نظر یافت نشد"
            });
        }

        let FindRoom = await Rooms.findOne({user_id : FindUser.id , idchat : room});


        if(!FindRoom && iduser != ""){
            FindRoom = await new Rooms({
                user_id : GetMe.id,
                title : "",
                avator : "",
                iduser,
                idchat,
                room : "person"
            });
            const RoomsUser = await new Rooms({
                user_id : iduser,
                title : "",
                avator : "",
                iduser : FindUser.id,
                idchat,
                room : "person"
            });

            await FindRoom.save()
            await RoomsUser.save()

        }
        console.log("room_id : " , FindRoom.id)
        const InsertMsg = await new Messages({
            room_id : FindRoom.id,
            user_id : FindUser.id,
            name : FindUser.name,
            email : FindUser.email,
            text,
            type : "text",
            idchat : FindRoom.idchat
        }) 
        
        await InsertMsg.save()

        return res.json({
            status : true,
            msg : "Done"
        })

    } catch (error) {
        console.log("this error : " , error)
    }
})


module.exports = router;