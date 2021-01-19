const express = require("express");
const router = express.Router();

router.get("/" , (req , res) => {
    //res.send("Hello Page Home");
    res.json({data : "data Success"});
});

module.exports = router;