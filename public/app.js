/* global $ */

//any code here run after DOM has been loaded
$(document).ready(() => {
    $.getJSON("/api/todos")
        // .then( (data) => {
        //     //console.log(data);
        // })
        .then(addTodos);
        
    $("#todoInput").keypress((event) => {
        if (event.which == 13) {
            createTodo();
        }
    });
    
    // //the code below does not append click event on potential future spans
    // //If there would be initial/starter items (static, not comes from database) this code works for them
    // $("span").on("click", () => {
    //     alert("X clicked");
    // });
    
    //the code below also does not append click event on potential future spans
    //But it works on "ul" (complete list) not span, this covers all tasks, exist from the beginning or the potential future.
    //BE CAREFUL on the usage: we are declaring that clicking on "span" is important, not on all the list
    //$('.list').on('click', 'span', () => {  /***** VERY STRANGE  ***** IS NOT WORKING, CALLBACK FUNCTION SHOULD BE DEFINED LIKE BELOW
    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();  //in order STOP to FIRE the other event below, because "span" is inside the "li"
        //alert("X clicked");
        //alert($(this).parent().data("id"));
        //$(this).parent().remove();
        // var clickedId = $(this).parent().data("id");  //"this" is span inside the "li", parent is the "li" clicked.
        // var deleteUrl = "/api/todos/" + clickedId;
        removeTodo($(this).parent());
        //$(this).parent().remove(); // -> we are calling this "removing todo object from the DOM process" inside the removeTodo function.
    });

    $(".list").on("click", "li", function() {
    //   alert("CLIK");
        updateTodo($(this));
    });
    
});

function addTodos(todos) {
    todos.forEach( (todo) => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    //var newTodo = $('<li>' + todo.name + '<span>X</span></li>');
    //newTodo.addClass("task");
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    
    newTodo.data("id", todo._id);  
    //IMPORTANT: THIS (key, data) PAIR ADDED TO EACH <LI>, TO STORE TODO ID. THIS INFO NOT SHOWN VIEW-CODE, ONLY IN THE MEMORY.
    //WE CAN USE "data-attr" PROPERTY OF THE <LI> AND STROE THE VALUE OVER THERE, AND ACCESS IT WHEN CLICKED.
    //var newTodo = $('<li class="task" data-attr="' + todo._id + '">' + todo.name + '<span>X</span></li>');
    
    newTodo.data("completed", todo.completed);  
    
    if (todo.completed) {
        newTodo.addClass("done");
    }
    
    $(".list").append(newTodo);    
}

function createTodo() {
    var usrInput = $("#todoInput").val();
    $.post("/api/todos", {name: usrInput})
    .then((newTodo) => {
        //console.log(newTodo);
        $("#todoInput").val('');
        addTodo(newTodo);
    })
    .catch((err) => {
        console.log(err);
    })
};

function removeTodo(todo) {
    var clickedTodoId = todo.data("id");
    var deleteUrl = "/api/todos/" + clickedTodoId;
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    }).then((data) => {
        //console.log(data);
        todo.remove(); //remove from the DOM
    }).catch((err) => {
        console.log(err);
    });
}

function updateTodo(todo) {
    //console.log(todo.data("completed"));
    var updateUrl = "/api/todos/" + todo.data("id");
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone};
    // console.log(updateData);
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    }).then((updatedTodo) => {
        console.log(updatedTodo);
        todo.data("completed", isDone);
        todo.toggleClass("done");
    }).catch((err) => {
        console.log(err);
    });
}