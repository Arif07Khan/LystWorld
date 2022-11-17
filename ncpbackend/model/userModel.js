const { model,Schema }=require('../connection');

const myschema=  new Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    createdAt:Date,
    IsAdmin:Boolean,
});

module.exports=model('users',myschema);