const express=require('express');
const router=express.Router();

const Model=require('../model/platformModel');

router.post('/add',(req,res)=>{
    new Model(req.body).save().then((result) => {
        console.log(result);
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
})

router.get('/showall',(req,res)=>{
    Model.find({}).then((result) => {
       console.log(result);
       res.json(result)
   }).catch((err) => {
       console.log(err);
   });
})
router.delete('/delete/:_id',(req,res)=>{
    Model.findByIdAndDelete(req.params._id).then((result) => {
       console.log(result);
       res.json(result)
   }).catch((err) => {
       console.log(err);
   });
})
router.get('/getbyid/:id',(req,res)=>{
    Model.findById(req.params.id).then((result) => {
       console.log(result);
       res.json(result)
   }).catch((err) => {
       console.log(err);
   });
})
router.put("/update/:id",(req,res)=>{
    console.log(req.params.id)
    Model.findByIdAndUpdate(req.params.id,req.body)
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        console.log(err);
        res.json(err);
    });
})

module.exports=router;