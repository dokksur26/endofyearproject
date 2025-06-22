// Redirect to login if user not logged in
if (!localStorage.getItem("currentUserEmail")) {
    alert("Please log in to access this page.");
    window.location.href = "login.html";
  }
  
  
  
