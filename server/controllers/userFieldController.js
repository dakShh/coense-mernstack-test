import express from 'express'
import mongoose from 'mongoose';

var ObjectID = mongoose.Types.ObjectId;
const router = express.Router();
import UserField from '../models/userField.js';


router.get('/',(req,res)=>{
    try {
        const userFields = UserField.find((err,data)=>{
            if (!err) res.status(200).json(data);
            else res.send(err.message)
        });
        
    } catch (error) {
        res.status(404).json({message : error.message});
    }

});

router.post('/',(req,res)=>{
    try {
        const newUser = new UserField({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            city : req.body.city,
            State : req.body.State,
            Country : req.body.Country,
            Area : req.body.Area
        })
    
        newUser.save((err,data)=>{
            if(!err) res.status(200).json(data);
            else res.send(err.message);
            // else alert.show(err.message);
        })
    } catch (error) {
        res.status(404).json({message : error.message});
    }
    
})

router.put('/:id',(req,res)=>{
    try {
        if(!ObjectID.isValid(req.params.id))
        return res.status(400).send("no record with given id :"+req.params.id);
        var updateUser = {
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            city : req.body.city,
            State : req.body.State,
            Country : req.body.Country,
            Area : req.body.Area
        }
        UserField.findByIdAndUpdate(req.params.id,{$set: updateUser},{new:true},(err,doc)=>{
            if(!err) res.send(doc)
            else console.log("error while updating a record:");
        })

        
    } catch (error) {
        res.status(404).json({messge:err.message});
        
    }
})

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    UserField.findById(id,(err,data)=>{
        res.json(data)
    })
})

router.post('/:id',(req,res)=>{
    const id = req.params.id;
    UserField.findById(id,(err,data)=>{
        if(!data){
            res.status(404).send("No data!");
        }else{
            data.name=req.body.name
            data.email = req.body.email,
            data.phone = req.body.phone,
            data.city = req.body.city,
            data.State = req.body.State,
            data.Country = req.body.Country,
            data.Area = req.body.Area,
            data.save().then(data=>{
                res.json(data)
            }).catch(err=> res.status(500).send(err.message))
        }
    })
})



router.delete('/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send("no record with given id :"+req.params.id);

    UserField.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("error while deleting a record:");
    })
})

export default router;