var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var HOMEPAGE = "index";
var USER_COLLECTION = "users";


if(process.env.MONGODB_URI == undefined){
  process.env.MONGODB_URI = "mongodb://heroku_tdjrgd33:k3j5qi89b97t5lr0jo2arb7umt@ds147274.mlab.com:47274/heroku_tdjrgd33";
}

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist";
app.set('views', distDir);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'dist', 'src')));
// app.use(express.static(path.join(__dirname, 'dist', 'src', 'app')));
app.use(express.static(distDir));


// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 4500, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});


///API code

function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }
  
  /*  "/api/contacts"
   *    GET: finds all contacts
   *    POST: creates a new contact
   */

  // app.get("/home", function(req, res){
  //   res.render('index.html');
  // });
  function goHome(resp){
    resp.status(200).sendFile(path.join(distDir + '/index.html'));
  }
  app.get(["/", "/home"], function(req, res){
    goHome(res);
  });
  
  app.get("/api/users", function(req, res) {
    db.collection(USER_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get user details.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/users", function(req, res) {

    var newUser = req.body;
    console.log(newUser);
      if (!req.body.name) {
        handleError(res, "Invalid user input", "Must provide a name.", 400);
      }
      if(!req.body._id){
        c = db.collection(USER_COLLECTION).count(function(err, count){
          if(err){
            handleError(res, "Please try again", "Unable to generate ID", 400);
          }
          newUser._id = count + 1;
        });
      }
      db.collection(USER_COLLECTION).insertOne(newUser, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create user.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
  });
  
  /*  "/api/contacts/:id"
   *    GET: find contact by id
   *    PUT: update contact by id
   *    DELETE: deletes contact by id
   */
  
  app.get("/api/users/:id", function(req, res) {
  });
  
  app.put("/api/users/:id", function(req, res) {
  });
  
  app.delete("/api/users/:id", function(req, res) {
  });

  //ERROR handling

  app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
  });

  app.use(function(err, req, res, next) {
    if(err.status !== 404) {
      return next();
    }
    goHome(res);
  });

