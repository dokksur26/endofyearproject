window.addEventListener("DOMContentLoaded", function () {
    const userEmail = localStorage.getItem("currentUserEmail");
    const userName = localStorage.getItem("currentUserName");
  
    const loginBtn = document.querySelector(".login-btn");
    const profileMenu = document.querySelector(".profile-dropdown");
    const profileIcon = document.querySelector(".profile-icon");
    const logoutItem = document.querySelector(".profile-menu li:last-child");
  
    if (userEmail && userName) {
      // Hide login button, show profile dropdown
      loginBtn.style.display = "none";
      profileMenu.style.display = "block";
  
      // Show user's name in the profile menu
      profileMenu.querySelector("ul").insertAdjacentHTML("afterbegin", `<li><strong>${userName}</strong></li>`);
  
      logoutItem.addEventListener("click", function () {
        localStorage.removeItem("currentUserEmail");
        localStorage.removeItem("currentUserName");
        alert("Logged out.");
        location.reload();
      });
    } else {
      // If not logged in, show login button and hide profile
      profileMenu.style.display = "none";
      loginBtn.style.display = "inline-block";
    }
  });
  
  
