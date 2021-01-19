
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function(req , res , next) {

    const token = await req.header("x-auth-token");

    if(!token){
        return res.status(400).json({error : "کاربر مورد نظر عضو سایت ما نمیباشد"});
    }

    try {
        const decode = await jwt.verify(token , config.get("jwtSecret"));
        req.user = decode.user;
        next();
        //res.json({data : "به پنل کاربری خود خوشآمدید"});
    } catch (error) {
        res.status(400).json({error : "عضو سایت ما نمیباشد ، لطفا از قسمت ورود ، وارد حساب خود شوید"});
        console.log("توکن اعتبارش تموم شد" , error);
    }
    

}
