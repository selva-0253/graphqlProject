const mongoose = require("mongoose")

const MSchema = mongoose.Schema


const postSchema = MSchema({
    comment: String,
    description: String,
    userID: String
})

module.exports = mongoose.model("Post", postSchema);
