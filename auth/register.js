checkLoggedInUser();

var todos = new Array();
var first_name, last_name, email, address, gender, x,password;

function submitRegistration(){

    var p = new Promise(function(resolve, reject) {
    
        event.preventDefault();
        if (validation()){
            resolve(1);
        }

    })
    p.then(function(result) { 
        var filename = x.files[0].name;
        var name = document.getElementById("first_name").value + ' ' + document.getElementById("last_name").value;

        var id = todos.length + 1;
        var todoItem = new Users(id, name, email, address,filename, gender,password );
        todos.push(todoItem);
        saveUserProfile(todoItem);
        $('.infoMessage').removeClass('alert-danger').addClass('alert alert-success').html("User registered successfully.");
        document.getElementById("register_form").reset(); // Reset Form Fields
    }).catch(function(error) {
        $('.infoMessage').addClass('alert alert-danger').html(error)
    });
}

function validation() {
    first_name = document.getElementById("first_name").value;
    last_name = document.getElementById("last_name").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    address = document.getElementById("address").value;
    gender =$("input[name='register[gender]']:checked").val();
    x = document.getElementById("profile_image");

    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (x.files.length === 0 || password === '' || first_name === '' || last_name === '' || email === '' || address === '' || gender === '' ) {
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

function Users(id, name, email, address,filename, gender, password ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.filename = filename;
    this.gender = gender;
    this.password = password;
}  

