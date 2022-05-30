const express = require('express')
const { default: mongoose } = require('mongoose')
const mediaRouter = express.Router()
const Media = require('../db/Schema/media')


mediaRouter.get("/list", async (req, res) => {
    const { page = 1, pageSize = 5 } = req.body;
    let medias =await  Media.find({}).sort("-createTime").skip((page-1)*pageSize).limit(pageSize)
    res.send(medias)
})



module.exports = mediaRouter