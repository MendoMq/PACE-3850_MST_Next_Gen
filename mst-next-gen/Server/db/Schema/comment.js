const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    fid:{type:mongoose.Schema.Types.ObjectId},
    replyId:{type:mongoose.Schema.Types.ObjectId},
    userId:{type:mongoose.Schema.Types.ObjectId},
    content:String,
    replyUserId:{type:mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('Comment', commentSchema);