var todos = new Array();
getTodoItems(); 

function toggeleAddTodo() {
    $('#todo').toggle();
}

function handleAddTodo(){
   event.preventDefault();
   var id = todos.length + 1;
   task = document.getElementById("task").value;
   dueDate = document.getElementById("duedate").value;
        var todoItem = new Todo(id, task, dueDate );
        todos.push(todoItem);
        saveTodo(todoItem);
        getTodoItems();
        document.getElementById("todo_form").reset();
}

function saveTodo(todoItem) {
   if (localStorage) {
       var key = "task" + todoItem.id;
       var item = JSON.stringify(todoItem);
       localStorage.setItem(key, item);
      
   }
   else {
       console.log("Error: you don't have localStorage!");
   }
}

function Todo(id, task, dueDate) {
    this.id = id;
    this.task = task;
    this.dueDate = dueDate;
    this.status = false;
}
function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 4) == "task") {
                var item = localStorage.getItem(key);
                var todoItem = JSON.parse(item);
                todos.push(todoItem);
           }
        }
        addTodosToPage();
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
        listFragment.appendChild(li);
    }
    ul.appendChild(listFragment);
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.task + " by " + todoItem.dueDate;

    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }
    else {
        spanDone.setAttribute("class", "done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    return li;
}