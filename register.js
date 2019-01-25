checkLoggedInUser();

var todos = new Array();
var first_name, last_name, email, address, gender, x;

function submitRegistration() {
    
    event.preventDefault();
    
    if (validation()) // Calling Validation Function
    {
        var filename = x.files[0].name;
        var name = document.getElementById("first_name").value + ' ' + document.getElementById("last_name").value;

        var id = todos.length + 1;
        var todoItem = new Users(id, name, email, address,filename, gender );
        todos.push(todoItem);
        saveUserProfile(todoItem);
        $('.infoMessage').hide();
        document.getElementById("register_form").reset(); // Reset Form Fields
    }
    
}

function validation() {
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    email = document.getElementById("email").value;
    address = document.getElementById("address").value;
    gender =$("input[name='register[gender]']:checked").val();
    x = document.getElementById("profile_image");

    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (x.files.length === 0 || first_name === '' || last_name === '' || email === '' || address === '' || gender === '' ) {
        $('.infoMessage').addClass('alert alert-danger').html('Please fill all the details.')
        return false;
    } else if (!(email).match(emailReg)) {
        $('.infoMessage').addClass('alert alert-danger').html("Invalid Email...!!!!!!");
        return false;
    } else {
        return true;
    }
}

function saveUserProfile(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function Users(id, name, email, address,filename, gender ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.filename = filename;
    this.gender = gender;
    this.password = '123456';
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
function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodo(todoItem);
    ul.appendChild(li);
    document.forms[0].reset();
}

function createNewTodo(todoItem) {
    var li = document.createElement("li");
    var spanTodo = document.createElement("span");
    spanTodo.innerHTML =
        todoItem.who + " needs to " + todoItem.task + " by " + todoItem.dueDate;

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
             
function getFormData() {
    var task = document.getElementById("task").value;
    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Please enter a person to do the task")) return;

    var date = document.getElementById("dueDate").value;
    if (checkInputText(date, "Please enter a due date")) return;
    
    var id = todos.length;
    var todoItem = new Todo(id, task, who, date);
    todos.push(todoItem);
    addTodoToPage(todoItem);
    saveTodoData();
    saveTodoItem(todoItem);
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}

function saveTodoItem(todoItem) {
    if (localStorage) {
        var key = "todo" + todoItem.id;
        var item = JSON.stringify(todoItem);
        localStorage.setItem(key, item);
    }
    else {
        console.log("Error: you don't have localStorage!");
    }
}

function checkLoggedInUser() {
    profileId = localStorage.getItem("Profile");
    if(profileId){
        window.location.href = 'profile.html';
    }
 }