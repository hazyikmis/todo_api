//name
//completed
//created_date

var mongoose = require("mongoose");
var todoSchema = new mongoose.Schema({
    //name: String,
    name : {
         type: String,
         required: "Name cannot be blank!"
    },
    //completed: Boolean,
    completed: {
        type: Boolean,
        default: false
    },
    //created_date: Date,
    created_date: {
        type: Date,
        default: Date.now
    }
});

var ToDo = mongoose.model("Todo", todoSchema);
// "Todo" is the name of the model

module.exports = ToDo;

// module.exports = mongoose.model("Todo", todoSchema);