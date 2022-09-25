const mongoose=require('mongoose');
const api_config=require("./config");

const url=api_config.dbUrl;

mongoose.connect(url).then((result) => {
    console.log("Database Connected");
}).catch((err) => {
    console.error(err);
});

module.exports=mongoose;