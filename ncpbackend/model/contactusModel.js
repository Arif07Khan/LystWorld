const {model,Schema}=require('../connection');


const myschema=new Schema({
    name:String,
    email:String,
    message:String,
    createdAt:Date,
})
module.exports=model('contactUs',myschema);