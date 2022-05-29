const express = require('express')
const { default: mongoose } = require('mongoose')
const forumRouter = express.Router()
const Forum = require('../db/Schema/forum')
const Comment = require('../db/Schema/comment')
const Like = require('../db/Schema/like')
forumRouter.post("/get", async (req, res) => {
    const { page = 1, pageSize = 5 } = req.body;
    try {
        const forumList =await Forum.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "fid",
                    as: "replys"
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "fid",
                    as: "likes"
                },
            },
        ]).sort("-createTime").skip((page-1)*pageSize).limit(pageSize)
        forumList.forEach(item=>{
            item.user = item.user.find((uitem)=>{
                return uitem._id.toString()===item.userId.toString()
            })||{}
        })
        const total =await Forum.count({})
        res.send({total,data:forumList})

    } catch {
        res.send({ errMsg: "fail to select" })
    }
})

forumRouter.post("/gethot", async (req, res) => {
    const { page = 1, pageSize = 3 } = req.body;
    try {
        const forumList =  await Forum.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "fid",
                    as: "replys"
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "fid",
                    as: "likes"
                },
            },
        ]).sort("-likes").limit(pageSize)
        forumList.forEach(item=>{
            item.user = item.user.find((uitem)=>{
                return uitem._id.toString()===item.userId.toString()
            })||{}
        })
        res.send(forumList)

    } catch {
        res.send({ errMsg: "fail to select" })
    }
})


forumRouter.get("/posts/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        const posts =await Forum.count({userId:id})
        const likes =await Like.count({userId:id})
        const comments =await Comment.count({userId:id})
        
        res.send({
            posts,likes,comments
        })
    }catch{
        res.send({errMsg:"fail to select"})
    }
})

forumRouter.get("/detail/:id",async (req,res)=>{
    const {id} = req.params;
    try{
        const detail = await Forum.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "fid",
                    as: "likes"
                },
            },
            {
                $match: {'_id': mongoose.Types.ObjectId(id)}
            }
        ])
        const likes =await Like.count({fid:id})

        const comments = await Comment.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "replyUserId",
                    foreignField: "_id",
                    as: "replyUser"
                },
            },
            {
                $match: {'fid': mongoose.Types.ObjectId(id)}
            }
        ])
        comments.forEach(item=>{
            item.user = item.user[0]
            item.replyUser = item.replyUser[0]
        })
        const result = []
        comments.map(item=>{
            if(item.replyId==id){
                result.push({...item})
            }else{
                let i = result.findIndex(fitem=>fitem._id.toString()===item.replyId.toString())
                console.log(i)
                i>-1&&(
                    result[i].replys = (result[i].replys||[]).concat([item])
                )
            }
        })

        res.send({
            ...detail[0],
            user:detail[0]&&detail[0].user&&detail[0].user[0],
            likes,
            comments:comments.length,
            commentList:result
        })
    }catch{
        res.send({errMsg:"fail to select"})
    }
})



forumRouter.post("/like",async (req,res)=>{
    const {id,userId} = req.body;
    if(!id||!userId){
        res.send({errMsg:"fail to params"})
        return false;
    }
    try{
        let islike =await Like.findOne({fid:id,userId})
        let like = null
        if(islike){
            like = await Like.deleteOne({fid:id,userId})
        }else{
            like = await new Like({
                fid:id,
                userId
            }).save()
        }
        
        res.send(like)
    }catch{
        res.send({errMsg:"fail to like"})
    }
})




module.exports = forumRouter