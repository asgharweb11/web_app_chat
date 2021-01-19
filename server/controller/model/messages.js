const mongoose = require("mongoose");
const schema = mongoose.Schema;

const SchemaMessage = new schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    room_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "rooms"
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    avator : {
        type : String,
        required : false
    },
    text : {
        type : String,
        maxlength : 1000
    },
    idfile : {
        type : String,
        required : false
    },
    type : {
        type : String,
        require : true
    },
    idchat : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }
    // ....
});

module.exports = mongoose.model("messages" , SchemaMessage);