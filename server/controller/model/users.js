const mongoos = require("mongoose");
const schema = mongoos.Schema;

const SchemaUsers = new schema({
    name : {
        type : String,
        required : "لطفا فیلد نام خود را تکمیل کنید",
        maxlength : 50,
    },
    last_name : {
        type : String,
        required : "لطفا فیلد نام خانوادگی خود را تکمیل کنید",
        maxlength : 50,
    },
    email : {
        type : String,
        required : "لطفا فیلد ایمیل خود را تکمیل کنید",
        minlength : 10,
        maxlength : 80,
        unique : true
    },
    password : {
        type : String,
        required : "لطفا فیلد پسورد خود را تکمیل کنید",
        minlength : 5,
    },
    avator : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});


module.exports = mongoos.model("user" , SchemaUsers);