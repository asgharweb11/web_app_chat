const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoURI");


const ConnectDB = async () => {

    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify : false
        })
        console.log(`Connected Is Server`);
    } catch (error) {
        console.log("ERROR DB : " , error);
        process.exit(1);
    }

}

module.exports = ConnectDB;



