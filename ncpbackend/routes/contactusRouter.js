const express=require('express');
const router=express.Router();
const Model=require('../model/contactusModel');


router.post('/add',(req,res)=>{
    new Model(req.body).save().then((result) => {
        console.log(result);
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
}
)

router.get('/showall',(req,res)=>{
    Model.find({}).then((result) => {
       console.log(result);
       res.json(result)
   }).catch((err) => {
       console.log(err);
   });
}
)

router.delete('/delete/:_id',(req,res)=>{
    Model.findByIdAndDelete(req.params._id).then((result) => {
       console.log(result);
       res.json(result)
   }).catch((err) => {
       console.log(err);
   });
}
)

module.exports=router;

