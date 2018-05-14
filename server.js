// require dependencies
var express = require("express");
var mongo = require("mongodb");
var bodyParser = require("body-parser");

// set the port to either the environment or 3000
var PORT = process.env.PORT || 3000;

// initialize Express
var app = express();

// use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({
    type: "application/json"
}));

// serve the public directory
app.use(express.static("public"));

// set the MongoDB to environment or localhost
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost";


// app.get('/', function (req, res) {
//     res.set({
//         'Access-Control-Allow-Origin': '*'
//     });
//     return res.redirect('/public/index.html');
// })


// create post route for email sign up
app.post('/signup', function (req, res) {
    // use req.body for the contents of the email
    var email = req.body;
    console.log("email is ", email);

    // connect to the database and the collection
    mongo.connect(MONGODB_URI, function (err, client) {
        if (err) throw err;

        var db = client.db("cakemix");

        console.log("connected to database successfully");

        // insert text into database collection
        db.collection("emails").insertOne(email, (err, collection) => {
            if (err) throw err;
            console.log("Record inserted successfully");
        });
    });

    res.set({
        'Access-Control-Allow-Origin': '*'
    });

    return res.sendStatus(200);

});

// listen for the routes
app.listen(PORT, function () {
    console.log("App is running");
});