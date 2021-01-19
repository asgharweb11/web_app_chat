const express = require("express");
const router = express.Router();
const User = require("../../controller/model/users");
const {check , validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/" , [
    check("name" , "فیلد نام نباید خالی و یا بیشتر از 50 کارکتر باشد").isLength({max : 50}).notEmpty(),
    check("last_name" , "فیلد نام خانوادگی نباید خالی و یا بیشتر از 50 کارکتر باشد").isLength({max : 50}).notEmpty(),
    check("email" , "ایمیل شما نباید کوتاه از 10 کارکتر باشد و ایمیل درستی باشد").isLength({min : 10}).isEmail(),
    check("password" , "ایمیل شما خیلی کوتاه میباشد").isLength({min : 6}),

] , async (req , res) => {

    const errors = await validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error : "لطفا در ارسال اطلاعات خود بیشتر دقت نمایید"});
    }

    const {name , last_name , email , password} = req.body;

    try {
        const FindUser = await User.findOne({email});

        if(FindUser){
            return res.status(400).json({error : "این کاربر در سامانه وجود دارد !!"});
        }


        let result = await new User({
            name,
            last_name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);
        result.password = await bcrypt.hash(password , salt);

        //console.log(result);

        await result.save();

        let paylod = {
            user : {
                id : result.id
            }
        }

        jwt.sign(paylod , config.get("jwtSecret") , {expiresIn : 36000} , (err , token) => {
            if (err) throw err;
            res.json({
                name : result.name,
                last_name : result.last_name,
                email : result.email,
                token
            });
        });



    } catch (error) {
        res.json({error : "خطلای سرور ، لطفا مجددا تلاش نمایید"});
        console.log({error});
    }
    

    //res.send("Hello Page Home");
});

module.exports = router;