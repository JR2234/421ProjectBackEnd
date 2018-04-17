var mongoose = require('mongoose');

module.exports = mongoose.model('Message',{
    msg: String,
    date: String,
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
