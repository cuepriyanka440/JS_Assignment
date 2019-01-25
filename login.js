var email,password; 

checkLoggedInUser();

function handleLogin() {
    
    event.preventDefault();

    var archive = [],
    keys = Object.keys(localStorage),
    i = 0, key, isLoggedIn = 0;
    if (validation()) // Calling Validation Function
    {
        
        for (; key = keys[i]; i++) {
            str1 = localStorage.getItem(key);
            if( str1.indexOf(email) != -1 && str1.indexOf( password )!= -1 ){
                isLoggedIn = 1;
                setCookie( key );
                window.location.href = 'profile.html';
            }
        }
        if( !isLoggedIn ) {
            $('.infoMessage').addClass('alert alert-danger').html("User is not registered with us.");
        }
    }
    
}


function validation() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( email === '' ) {
        $('.infoMessage').addClass('alert alert-danger').html('Please enter email address.')
        return false;
    } else if (!(email).match(emailReg)) {
        $('.infoMessage').addClass('alert alert-danger').html("Invalid Email...!!!!!!");
        return false;
    } else {
        return true;
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function setCookie(cvalue) {
    localStorage.setItem("Profile", cvalue );    
}

function checkLoggedInUser() {
    profileId = localStorage.getItem("Profile");
    if(profileId){
        window.location.href = 'profile.html';
    }
 }