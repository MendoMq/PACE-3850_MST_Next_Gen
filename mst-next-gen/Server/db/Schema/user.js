const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:String,
    password:String,
    avatar:{type:String,default:''},
    gender:Boolean,
    role:{
        type: String,
        enum: ["admin","user"],
        default:"user"
    },
    createTime:{
        type: Date,
        default: Date.now
    },
    updateTime:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

module.exports = mongoose.model('User', userSchema);