const express = require('express')
const userRouter = express.Router()
const User = require('../db/Schema/user')
userRouter.get("/:id",async (req,res)=>{
    const {id} = req.params
    try{
        const result = User.findById(id)
        res.send(result)
    }
    catch{
        res.send({errMsg:"no found"})
    }
})
userRouter.post("/login",async (req,res)=>{
    const {username,password} = req.body
    const result =await User.findOne({username})
    if(result){
        if(username==result.username&&password==result.password){
            req.session.user = result
            res.send(result)
        }else if(password!=result.password){
            res.send({errMsg:"Password error"})
        }
    }else{
        res.send({errMsg:"The user name is not registered"})
    }
})
userRouter.post("/register",async (req,res)=>{
    const {username,password} = req.body
    const result =await User.findOne({username})
    if(result){
        return res.send({errMsg:"The user name already exists"})
    }else{
        const user = new User({username,password})
        user.save((err,resuser)=>{
            if(err){
                return res.send({errMsg:"fail to register"})
            }
            res.send(resuser)
        })
    }
    
})
userRouter.post("/logout",async (req,res)=>{
    req.session.user = null;
    res.send("")
})

module.exports = userRouter