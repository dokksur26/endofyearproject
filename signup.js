const scriptURL = "https://script.google.com/macros/s/AKfycbw_-R6nm19l37i7lbney8ZejNy5wqf84_fSR82BlEBp8Z9OyBOBzxAglpITGxyItO9vbw/exec";

const signupForm = document.querySelector("form");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = signupForm.querySelectorAll("input");
  const fullName = inputs[0].value.trim();
  const email = inputs[1].value.trim();
  const password = inputs[2].value;

  const confirmPassword = prompt("Please confirm your password:");
  if (confirmPassword !== password) {
    alert("Passwords do not match.");
    return;
  }

  const data = {
    email,
    password,
    fullName,
    action: "signup"
  };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.text();

    if (result === "EXISTS") {
      alert("An account already exists with this email.");
    } else if (result === "OK") {
      alert("Signup successful!");
      window.location.href = "login.html";
    } else {
      alert("Unexpected error occurred.");
    }
  } catch (err) {
    alert("Network error. Try again.");
    console.error(err);
  }
});
