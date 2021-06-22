const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    comment_id: {
        type: String,
        required: true
    },
    containt: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Articles", CommentSchema);