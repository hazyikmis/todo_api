// When the "models" directory required in the project app.js (index.js) 
// this index.js file processed directly because of its name.
// This index.js file, at the end -as you see- directs that todo.js file
// also required (processed) and exported out.

var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/todo-api", {useNewUrlParser: true});

mongoose.Promise = Promise;
// The "mongoose.Promise = Promise" command above provide us to use
// db.todo.find().then()... & .catch()
// rather than using callback function like this:
// db.todo.find(function() {...})

module.exports.ToDo = require("./todo");
