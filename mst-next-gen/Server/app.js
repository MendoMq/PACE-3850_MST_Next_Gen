const express = require('express')
const cors = require('cors')
const app = express()
const session = require('express-session');
const sessionOption = {
    name: 'app',
    secret: 'next gen',
    cookie: { path: '/', httpOnly: false, secure: false, maxAge: 24*60*60*1000 },
    resave: false,
    saveUninitialized: true,
}
app.set('trust proxy', 1) // trust first proxy
app.use(session(sessionOption))


// routers
const UserRouter = require('./routers/user');
const forumRouter = require('./routers/forum');
const commentRouter = require('./routers/comment');
const blogRouter = require('./routers/blog');


app.use(cors({credentials:true,origin:true}))
app.use(express.json())
app.use(express.static('build'))

app.use("/user", UserRouter)
app.use("/forum", forumRouter)
app.use("/comment", commentRouter)
app.use("/blog", blogRouter)

module.exports = app