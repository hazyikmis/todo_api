//All todo routes are here

var express = require("express");
var router = express.Router();
var db = require("../models");
var helpers = require("../helpers/todos");

// router.get("/", (req, res) => {
//     // res.send("Hello from todos routes");
//     db.ToDo.find()
//     .then((todos) => {
//         res.json(todos);
//     })
//     .catch((err) => {
//         res.send(err);
//     });
// });

//the code above simplified by adding helpers/todos.js and writing down like below:
//(the code above cut from here and moved to helpers/todos.js inside the getTodos function)
//router.get("/", helpers.getTodos);

// router.post("/", (req, res) => {
//   //res.send("This is the POST route");
//   //console.log(req.body);
//   //db.ToDo.create({name: "FEED FISH"});
//   db.ToDo.create(req.body)
//   .then((newTodo) => {
//       res.status(201).json(newTodo);
//   })
//   .catch((err) => {
//       res.send(err);
//   });
// });

//the code above simplified by adding helpers/todos.js and writing down like below:
//(the code above cut from here and moved to helpers/todos.js inside the createTodo function)
//router.post("/", helpers.createTodo);

//All routes for "/" simplified like below: 
router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo);



// router.get("/:todoId", (req, res) => {
//     db.ToDo.findById(req.params.todoId)
//     .then((foundTodo) => {
//         res.json(foundTodo);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

// router.get("/:todoId", helpers.getOneTodo);

// router.put("/:todoId", (req, res) => {
//     //res.send("UPDATE ROUTE!");
//     //db.ToDo.findOneAndUpdate({_id: req.params.todoId}, {name: "WALK DOG"})
//     // db.ToDo.findOneAndUpdate({_id: req.params.todoId}, req.body)   //this updates the record but response with the old version of the data. If you want to receive the updated version yo need to send the {new: true} parameter as below
//     // .then((oldTodo) => {
//     //     res.json(oldTodo);
//     // })
//     db.ToDo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
//     .then((updatedTodo) => {
//         res.json(updatedTodo);
//     })
//   .catch((err) => {
//       res.send(err);
//   });
// });

// router.put("/:todoId", helpers.updateTodo);

// router.delete("/:todoId", (req, res) => {
//     //res.send("DELETE ROUTE!");
//     db.ToDo.remove({_id:req.params.todoId})
//     .then(() => {
//         res.json({message: "Task deleted."});
//     })
//   .catch((err) => {
//       res.send(err);
//   });
// });

// router.put("/:todoId", helpers.deleteTodo);

router.route("/:todoId")
    .get(helpers.getOneTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;