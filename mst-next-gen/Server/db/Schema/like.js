const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    fid:{type:mongoose.Schema.Types.ObjectId},
    userId:{type:mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Like', likeSchema);