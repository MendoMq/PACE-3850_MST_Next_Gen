const express = require('express')
const { default: mongoose } = require('mongoose')
const blogRouter = express.Router()
const Blog = require('../db/Schema/blog')


blogRouter.get("/list", async (req, res) => {
    const { page = 1, pageSize = 5 } = req.body;
    let blogs =await  Blog.find({}).sort("-createTime").skip((page-1)*pageSize).limit(pageSize)
    res.send(blogs)
})

blogRouter.put("/add",async (req,res)=>{
    const {title,content,userId} = req.body
    if(!title||!content||!userId){
        return res.send({errMsg:"fail to params"})
    }
    let blog =await new Blog({
        title,
        content,
        userId
    }).save()

    res.send(blog)
})

blogRouter.post("/edit",async (req,res)=>{
    const {title,content,userId,_id} = req.body
    if(!title||!content||!userId||!_id){
        return res.send({errMsg:"fail to params"})
    }
    try{
        let blog = await Blog.updateOne({_id},{title,content})
        res.send(blog)
    }catch{
        res.send({errMsg:"fail to edit"})
    }
})

blogRouter.delete("/delete/:id",async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.send({errMsg:"fail to params"})
    }
    try{
        let blog = await Blog.deleteOne({_id:id})
        res.send(blog)
    }catch{
        res.send({errMsg:"fail to edit"})
    }
})


module.exports = blogRouter