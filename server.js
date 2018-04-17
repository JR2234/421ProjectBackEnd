var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var auth = require('./controllers/auth');
var message = require('./controllers/message');
var comment = require('./controllers/comment')
var checkAuthenticated = require('./services/checkAuthenticated');
var cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.get('/api/message', message.get);

app.post('/api/message',checkAuthenticated, message.post);

app.post('/api/comment', checkAuthenticated, comment.post);

app.post('/auth/register', auth.register);

//Connection
mongoose.connect("mongodb://localhost:27017/PostDB", function (err, db) {
    if (!err) {
        console.log("Connected to MongoDB");
    }
})

var server = app.listen(5000, function () {
    console.log('listening on port ', server.address().port)
})
