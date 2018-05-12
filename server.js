// require dependencies
var express = require("express");
var mongo = require("mongodb");
var bodyParser = require("body-parser");

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

//var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/cakemix";
//var new_db = "mongodb://localhost/cakemix";

app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
}).listen(3000);

console.log("Server listening at : 3000");



// Sign-up function starts here. . .
app.post('/sign_up', function (req, res) {
    var email = req.body;
    console.log("email is ",  email);

    mongo.connect('mongodb://localhost', function (err, client) {
        if (err) throw err;

        var db = client.db('cakemix');
        console.log("connected to database successfully");
        db.collection("emails").insertOne(email, (err, collection) => {
            if (err) throw err;
            console.log("Record inserted successfully");
            console.log(collection);
        });
    });

    console.log("DATA is " + JSON.stringify(email));
    res.set({
        'Access-Control-Allow-Origin': '*'
    });
   // return res.redirect('./public/success.html'); 
  return res.sendStatus(200);

});

// listen for the routes
// app.listen(PORT, function () {
//     console.log("App is running");
// });