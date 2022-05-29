const express = require('express')
const { default: mongoose } = require('mongoose')
const blogRouter = express.Router()
const Blog = require('../db/Schema/blog')


blogRouter.get("/list", async (req, res) => {
    const { page = 1, pageSize = 2 } = req.body;
    let blogs =await  Blog.find({}).sort("-createTime").skip((page-1)*pageSize).limit(pageSize)
    res.send(blogs)
})



module.exports = blogRouter