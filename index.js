var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");

var todoRoutes = require("./routes/todos");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static("public")); //if we run the app from another directory, this does not work! So its better to use like below
app.use(express.static(__dirname + "/public")); //this one always work
app.use(express.static(__dirname + "/views"));
//console.log(__dirname);

app.get("/", (req, res) => {
   //res.send("Hello from the root route");
   res.sendFile("index.html");
});
  
app.get("/happy", (req, res) => {
   res.send(":)") ;
});

app.get("/message", (req, res) => {
   //res.send({message: "Hi from the JavaScript Object (json)", from:"node/express App", to:"you"});
   res.json({message: "Hi from the JavaScript Object (json)", from:"node/express App", to:"you"});
// IMOORTANT: "res.send" causes the content-type:text/html of the response, 
// while "res.json", the content-type:application/json. We will see no difference on the output
// but it might be more correct way to use "send.json" if we try to response/send a json object
});

//VERY IMPORTANT NOTE: The route uses BELOW should be at the end of the app/index.js
//Otherwise many problems you might see...
app.use("/api/todos", todoRoutes);

//app.listen(process.env.PORT, () => {
app.listen(port, () => {
    console.log("APP IS RUNNING ON IP:PORT " + process.env.IP + ":"+ port);
});




// THE ROUTES

// Ver         Route                   Desc.
// -------     --------------------    -------------------
// GET         /api/todos              List all todos
// POST        /api/todos              Create new todo
// GET         /api/todos/:todoid      Retrieve a todo
// PUT         /api/todos/:todoid      Update a todo
// DELETE      /api/todos/:todoid      Delete a todo
