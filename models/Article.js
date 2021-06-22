const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    containt: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: false
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Articles", ArticleSchema);