var todos = new Array();
profileId = localStorage.getItem("Profile");
userData = JSON.parse( localStorage.getItem(profileId) );
checkLoggedOutUser();
getTodoItems(); 


function handleAddTodo(){

    var p = new Promise(function(resolve, reject) {
    
        event.preventDefault();
        task = document.getElementById("task").value;
        dueDate = document.getElementById("duedate").value;
        todoId = document.getElementById("todo_id").value;
        if (task === '' || dueDate === '' ) {
        $('.infoMessages').addClass('alert alert-danger').html('Please fill all the details.')
        
        reject('Please fill all the details.');

        } else {
            resolve(1);
        }

    })
    p.then(function(result) { 
        if(todoId > 0) {
            var id = todoId;
    } else {
            var maxid = 0;
            todos.map(function(obj){     
                if (obj.id > maxid) maxid = obj.id;    
            });
            var id = maxid + 1;
    }

        var todoItem = new Todo(id, task, dueDate, ( ($("#done").prop('checked') == true )? true : false ) );
        todos.push(todoItem);
        saveTodo(todoItem);
        getTodoItems();
        document.getElementById("todo_form").reset();
        $('#todo_id').val(null);
    }).catch(function(error) {
        $('.infoMessages').addClass('alert alert-danger').html(error)
    });
}

function saveTodo(todoItem) {
   if (localStorage) {
       
       var key = userData.id +"task" + todoItem.id;
       var item = JSON.stringify(todoItem);
       localStorage.setItem(key, item);
   }
   else {
       console.log("Error: you don't have localStorage!");
   }
}

function Todo(id, task, dueDate, done) {
    this.id = id;
    this.task = task;
    this.dueDate = dueDate;
    this.done = done;
}
function getTodoItems() {
    if (localStorage) {
        todos =[];
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            strKey = userData.id +"task";
           
            if (key.substring(0, 5) == strKey ) {
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
    $("#todoList").html('');
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodo(todoItem);
    }
   
}

function createNewTodo(todoItem) {

    var html = '<tr id="'+ todoItem.id +'">' + 
               '<td><input type="checkbox" name="todo[]" class="todo" value="'+ todoItem.id +'">'+ todoItem.task + '</td>' +
               '<td>'+ todoItem.dueDate + '</td>' +
               '<td>'+ todoItem.done + '</td>' +
               '<td><a href="#" onClick ="handleEditTodo('+ todoItem.id +')" id="'+ todoItem.id +'">Edit | </a>'+
               '<a href="#" onClick ="handleDeleteTodo('+ todoItem.id +')" id="'+ todoItem.id +'">Delete</a>' +
               '</td>';

    $("#todoList").append(html);
}

function handleDeleteTodo(id){
    localStorage.removeItem('task'+id);
    $('#'+id).remove();
}

function handleEditTodo(id){
    todo = JSON.parse(localStorage.getItem('task'+id));
    $('#task').val( todo.task );
    $('#duedate').val( todo.dueDate );
    $('#todo_id').val( todo.id );
    
    if( todo.done === true || todo.done === 'true') {
        $('#done').attr('checked',true);
    } else {
        $('#done').attr('checked',false);
    }
}

$(document).ready(function() {
    $('#tableTodos').DataTable();
    $( "#duedate" ).datepicker();
} );

function deleteMultipleTodos() {
    var isDeleted = 0;
    $.each($("input[name='todo[]']:checked"), function(){     
        localStorage.removeItem('task'+$(this).val());
        $('#'+$(this).val()).remove();
        var isDeleted = 1;
    });
    if( isDeleted == 0 ) {
        $('.infoMessage').addClass('alert alert-danger').html('Please selecte at least one todo to delete. ');
    }
   
}