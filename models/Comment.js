var mongoose = require('mongoose');

module.exports = mongoose.model('Comment', {
    msgId: mongoose.Schema.ObjectId,
    cmt: String,
    date: String,
    username: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})
