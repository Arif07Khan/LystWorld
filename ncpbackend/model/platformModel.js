const { model, Schema }=require('../connection');

const myschema=new Schema({
    title:String,
    describe:String,
    concise:String,
    offer:[],
    plan:[],
    category:String,
    link:String,
    createdAt:Date,
    thumbnail:String,
})

module.exports=model('platforms',myschema);