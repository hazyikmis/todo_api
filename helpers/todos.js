var db = require("../models");

exports.getTodos = function(req, res) {
    // res.send("Hello from todos routes");
    db.ToDo.find()
    .then((todos) => {
        res.json(todos);
    })
    .catch((err) => {
        res.send(err);
    });
};

exports.createTodo = function(req, res) {
   //res.send("This is the POST route");
   //console.log(req.body);
   //db.ToDo.create({name: "FEED FISH"});
   db.ToDo.create(req.body)
   .then((newTodo) => {
       res.status(201).json(newTodo);
   })
   .catch((err) => {
       res.send(err);
   });
};

exports.getOneTodo = function(req, res) {
    db.ToDo.findById(req.params.todoId)
    .then((foundTodo) => {
        res.json(foundTodo);
    })
    .catch((err) => {
       res.send(err);
    });
};

exports.updateTodo = function(req, res) {
    //res.send("UPDATE ROUTE!");
    //db.ToDo.findOneAndUpdate({_id: req.params.todoId}, {name: "WALK DOG"})
    // db.ToDo.findOneAndUpdate({_id: req.params.todoId}, req.body)   //this updates the record but response with the old version of the data. If you want to receive the updated version yo need to send the {new: true} parameter as below
    // .then((oldTodo) => {
    //     res.json(oldTodo);
    // })
    db.ToDo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then((updatedTodo) => {
        res.json(updatedTodo);
    })
   .catch((err) => {
       res.send(err);
   });
};

exports.deleteTodo = function(req, res) {
    //res.send("DELETE ROUTE!");
    db.ToDo.remove({_id:req.params.todoId})
    .then(() => {
        res.json({message: "Task deleted."});
    })
   .catch((err) => {
       res.send(err);
   });
};

module.exports = exports;