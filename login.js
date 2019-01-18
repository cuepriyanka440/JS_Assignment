function submitRegistration() {
    // localStorage.setItem("lastname", "Smith");
    // alert(localStorage.getItem("lastname"));
    
    event.preventDefault();
    
    
    localStorage.setItem("lastname", "Smith");

    if (validation()) // Calling Validation Function
    {
        // Serializing Form Data And Displaying It In <p id="wrapper"></p>
        formData = $('form').serialize();
        var x = document.getElementById("profile_image");
        var filename = x.files[0].name;
        document.getElementById("register_form").reset(); // Reset Form Fields
        let profileData = {
            'name': document.getElementById("first_name").value + ' ' + document.getElementById("last_name").value,
            'email':document.getElementById("email").value,
            'address':'pune',
            'image': filename,
            'gender':'M'
        }
        localStorage.setItem("Profile", JSON.stringify(profileData));
        $('.infoMessage').hide();
    }
    console.log(JSON.localStorage.getItem("Profile"));
    
}

function validation() {
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var email = document.getElementById("email").value;
    //var contact = document.getElementById("contact").value;
    var emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (first_name === '' || last_name === '' || email === '' ) {
        $('.infoMessage').addClass('alert alert-danger').html('Please fill all the details.')
        return false;
    } else if (!(email).match(emailReg)) {
        $('.infoMessage').addClass('alert alert-danger').html("Invalid Email...!!!!!!");
        return false;
    } else {
        return true;
    }
}