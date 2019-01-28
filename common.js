function handleLogout() {
   localStorage.removeItem('Profile');
   window.location.href = '../auth/login.html';
}
function checkLoggedOutUser() {
   profileId = localStorage.getItem("Profile");
   if(profileId){
      
   } else {
      window.location.href = '../auth/login.html';
   }
}

function checkLoggedInUser() {
   profileId = localStorage.getItem("Profile");
   if(profileId){
       window.location.href = '../profile/profile.html';
   }
}