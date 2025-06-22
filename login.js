const scriptURL = "https://script.google.com/macros/s/AKfycbw_-R6nm19l37i7lbney8ZejNy5wqf84_fSR82BlEBp8Z9OyBOBzxAglpITGxyItO9vbw/exec ";
const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = loginForm.querySelectorAll("input");
  const email = inputs[0].value.trim();
  const password = inputs[1].value;

  const data = {
    email,
    password,
    action: "login"
  };

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const result = await res.text();

    if (result.startsWith("OK")) {
      const fullName = result.split("|")[1] || "User";
      localStorage.setItem("currentUserEmail", email);
      localStorage.setItem("currentUserName", fullName);
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password.");
    }
  } catch (err) {
    alert("Login failed. Try again.");
    console.error(err);
  }
});
