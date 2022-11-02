const { model, Schema }=require('../connection');

const myschema=new Schema({
    title:String,
    describe:String,
    concise:String,
    offer:[],
    plan1:'',
    plan2:'',
    plan3:'',
    category:String,
    link:String,
    createdAt:Date,
    thumbnail:String,
})

module.exports=model('platforms',myschema);