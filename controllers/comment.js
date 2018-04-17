var Comment = require('../models/Comment');
var mongodb = require('mongodb');
var dbClient = mongodb.MongoClient;
var url = 'mongodb://127.0.0.1:27017';
const {ObjectId} = require('mongodb');

module.exports = {
    get: function (req, res) {
        Comment.find({}).populate('user', '-pwd').exec(function (err, result) {
            res.send(result);
        })
    },
    post: function (req, res) {
        console.log(req.body, req.user);

        req.body.user = req.user;

        var comment = new Comment(req.body);

        //var conditions = {_id: comment.msgId};

        dbClient.connect(url, function(err, db){
            if (err) throw err;
            var dbo = db.db('PostDB');
            var newValue = {$push: {comments: comment.id}};
            dbo.collection('messages').updateOne({_id: comment.msgId}, newValue, function(err, result){
                if (err) throw err;
                console.log("Updated message");
                db.close();
            });
        });

        //Message.findById(conditions, function(err, message){
          //  if (err) console.log('find');

           // message.comments.push(comment.id);
           // message.save(function(err, updatedMessage){
             ///  if (err) console.log('save');
            //    res.send(updatedMessage);
            //});
        //});

        comment.save();

        res.status(200);
    }
}
