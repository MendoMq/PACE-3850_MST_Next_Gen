const express = require('express')
const apiRouter = express.Router()

console.log(`API controller is running`)

apiRouter.use('/userlogin', (req,res)=>{
    res.send({
        token: 'test123'
    })
});

module.exports = apiRouter