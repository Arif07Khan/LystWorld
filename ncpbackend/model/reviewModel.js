const { model, Schema, Types }=require('../connection');

const myschema=new Schema({
   rating:Number,
   review:String,
   createdAt:Date,
   platform:{type : Types.ObjectId, ref: 'platforms'},
   user:{type: Types.ObjectId,ref:'users'},
})

module.exports=model('ratingreview',myschema);