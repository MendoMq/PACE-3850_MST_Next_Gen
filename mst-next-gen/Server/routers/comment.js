const express = require('express')
const { default: mongoose } = require('mongoose')
const commentRouter = express.Router()
const Comment = require('../db/Schema/comment')


commentRouter.put("/reply", async (req, res) => {
    const { fid,replyId,userId,content,replyUserId } = req.body;
    if(!fid||!replyId||!userId||!content||!replyUserId){
        res.send({errMsg:"fail to params"})
        return false;
    }
    let comment =await new Comment({fid,replyId,userId,content,replyUserId}).save()
    res.send(comment)
    
})



module.exports = commentRouter