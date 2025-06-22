const scriptURL = "https://script.google.com/macros/s/AKfycbw_-R6nm19l37i7lbney8ZejNy5wqf84_fSR82BlEBp8Z9OyBOBzxAglpITGxyItO9vbw/exec "; 
const input = document.querySelector(".input-section input");
const addButton = document.querySelector(".input-section button");
const taskList = document.querySelector(".task-list");

const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!currentUser) {
  alert("Please login to access your to-do list.");
  window.location.href = "login.html";
}

async function loadTasks() {
  const res = await fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "get", email: currentUser.email }),
    headers: { "Content-Type": "application/json" },
  });
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    if (task.done) span.style.textDecoration = "line-through";

    const iconDiv = document.createElement("div");
    iconDiv.className = "icons";

    const check = document.createElement("i");
    check.className = "fas fa-check";
    check.addEventListener("click", () => updateTask(task.text, !task.done));

    const trash = document.createElement("i");
    trash.className = "fas fa-trash";
    trash.addEventListener("click", () => deleteTask(task.text));

    iconDiv.appendChild(check);
    iconDiv.appendChild(trash);
    li.appendChild(span);
    li.appendChild(iconDiv);
    taskList.appendChild(li);
  });
}

addButton.addEventListener("click", async () => {
  const taskText = input.value.trim();
  if (taskText === "") return;

  await fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "add", email: currentUser.email, task: taskText }),
    headers: { "Content-Type": "application/json" },
  });

  input.value = "";
  loadTasks();
});

async function updateTask(task, done) {
  await fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "update", email: currentUser.email, task, done }),
    headers: { "Content-Type": "application/json" },
  });
  loadTasks();
}

async function deleteTask(task) {
  await fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({ action: "delete", email: currentUser.email, task }),
    headers: { "Content-Type": "application/json" },
  });
  loadTasks();
}

// Load tasks on page load
loadTasks();
