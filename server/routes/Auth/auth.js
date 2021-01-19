const express = require("express");
const router = express.Router();
const {check , validationResult } = require("express-validator");
const User = require("../../controller/model/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../controller/middleware/auth");


router.get("/" , auth , async (req , res) => {

    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user){
            res.json({error : "اطلاعات شما منقضی میباشد ، لطفا مجدد وارد حساب خود شوید"});
        }
        res.json({user});

        // res.json({
        //     name : user.name,
        //     last_name : user.last_name,
        //     email : user.email
        // });
    } catch (error) {
        res.json({error : "خطای سرور"});
    }
    
});

router.post('/' , [
    check("email" , "لطفا ایمیل درستی وارد نمایید").isEmail(),
    check("password" , "لطفا در ارسال پسورد بیشتر دقت نمایید ، پسورد شما نباید کمتر از 6 کارکتر باشد").isLength({min : 6}).notEmpty()
] , async (req , res) => {
    const errors = await validationResult(req);

    console.log(errors)

    if(!errors.isEmpty()){
        return res.status(400).json({error : "لطفا در ارسال اطلاعات خود بیشتر دقت نمایید"});
        //return res.status(400).json({error : errors.array()});
    }

    const {email , password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error : "کاربر مورد نظر در سیستم یافت نشد"});
        }

        const IsMatch = await bcrypt.compare(password , user.password);

        if(!IsMatch){
            return res.status(400).json({error : "اطلاعات شما با هم مطابقت ندارد !!"});
        }


        const payload = {
            user : {
                id : user.id
            }
        }
        await jwt.sign(payload , config.get("jwtSecret") , {expiresIn : 36000} , (err , token) => {
            if(err) throw err;
            //res.json({data : "ورود به حساب"});
            res.json({
                name : user.name,
                last_name : user.last_name,
                email : user.email,
                token
            });
        });

    } catch (error) {
        res.json({error : "خطلای سرور ، لطفا مجددا تلاش نمایید"});
    }
    

});

module.exports = router;