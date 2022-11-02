const express=require('express')
const router=express.Router();
const Model=require('../model/userModel')

router.post('/add',(req,res)=>{
    new Model(req.body).save().then((result) => {
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

router.get('/showall',(req,res)=>{
     Model.find({}).then((result) => {
        console.log(result);
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
}   )
router.post('/authenticate',(req,res)=>{
    const formdata=req.body;
    Model.findOne({email:formdata.email,password:formdata.password}).then((result) => {
        if(result){
            res.status(200).json(result);
        }else{
            res.status(400).json({message:"Invalid password or Email"})
        }
    }).catch((err) => {
        res.status(500).json(err);
    });
}  )

router.post('/checkemail',(req,res)=>{
    const formdata=req.body;
    Model.findOne({email:formdata.email}).then((result) => {
        console.log(result);
        if(result){
            res.status(200).json(result);
        }else{  
            res.status(400).json({message:"Invalid Email"})
        }
    }).catch((err) => {
        res.status(500).json(err);
    });
}  )



module.exports = router;