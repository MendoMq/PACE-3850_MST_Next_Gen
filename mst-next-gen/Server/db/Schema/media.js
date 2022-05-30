const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: String,
    content: String,
    path: String,
    userId: { type: mongoose.Schema.Types.ObjectId },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: { createdAt: 'createTime', updatedAt: "updateTime" }
});

module.exports = mongoose.model('Media', mediaSchema);