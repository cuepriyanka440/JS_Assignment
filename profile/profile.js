var email; 

checkLoggedOutUser();
loadLoggedInUser();

function loadLoggedInUser() {

   profileId = localStorage.getItem("Profile");
   userData = JSON.parse( localStorage.getItem(profileId) );
   $('#name').html(userData.name);
   $('#email').html(userData.email);
   $('#address').html(userData.address);
   $('#gender').html(userData.gender);
   $('#img').attr('src', 'file:///home/priyanka/Pictures/' + userData.filename);
}