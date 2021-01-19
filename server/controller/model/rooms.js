const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaRooms = new schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    title : {
        type : String,
        require : "لطفا عنوان خود را درج کنید"
    },
    avator : {
        type : String
    },
    iduser : {
        type : String,
        require : true
    },
    idchat : {
        type : Number,
        require : true,
        unique : false
    },
    room : {
        type : String,
        require : true
    }

});


module.exports = mongoose.model("rooms" , SchemaRooms);