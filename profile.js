var email; 


checkLoggedInUser();

function checkLoggedInUser() {
    profileId = localStorage.getItem("Profile");
    userData = JSON.parse( localStorage.getItem(profileId) );
    $('#name').html(userData.name);
    $('#email').html(userData.email);
    $('#address').html(userData.address);
    $('#gender').html(userData.gender);
    $('#img').attr('src', 'file:///home/priyanka/Pictures/' + userData.filename);
   
 }

 function handleLogout() {
     
    localStorage.removeItem('Profile');
    window.location.href = 'login.html';
 }




