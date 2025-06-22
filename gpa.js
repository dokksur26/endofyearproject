const coursesContainer = document.getElementById("courses-container");
const addCourseBtn = document.getElementById("addCourseBtn");
const gpaForm = document.getElementById("gpaForm");
const resultDiv = document.getElementById("result");

// Get current logged in user email
const currentUserEmail = localStorage.getItem("currentUserEmail");
if (!currentUserEmail) {
  alert("Please log in to access the GPA Calculator.");
  window.location.href = "login.html";
}

// Helper: localStorage key for this user's courses
const storageKey = `courses_${currentUserEmail}`;

// Load saved courses from localStorage or start with one empty course
let savedCourses = JSON.parse(localStorage.getItem(storageKey)) || [
  { name: "", grade: "", credits: "" }
];

// Function to render courses on page
function renderCourses() {
  coursesContainer.innerHTML = "";
  savedCourses.forEach((course, index) => {
    const div = document.createElement("div");
    div.className = "course-input";
    div.innerHTML = `
      <input type="text" placeholder="Course Name" value="${course.name}" required />
      <input type="number" placeholder="Grade (0–100)" min="0" max="100" value="${course.grade}" required />
      <input type="number" placeholder="Credits" min="0" value="${course.credits}" required />
      <button type="button" class="removeCourseBtn">Remove</button>
    `;
    // Remove button event
    div.querySelector(".removeCourseBtn").addEventListener("click", () => {
      savedCourses.splice(index, 1);
      saveCourses();
      renderCourses();
    });
    coursesContainer.appendChild(div);
  });
}

// Save courses to localStorage
function saveCourses() {
  localStorage.setItem(storageKey, JSON.stringify(savedCourses));
}

// Add new empty course
addCourseBtn.addEventListener("click", () => {
  savedCourses.push({ name: "", grade: "", credits: "" });
  saveCourses();
  renderCourses();
});

// Handle form submit to calculate GPA
gpaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Read input values and validate
  const courseDivs = coursesContainer.querySelectorAll(".course-input");
  let totalWeightedGrades = 0;
  let totalCredits = 0;
  let newCoursesData = [];

  for (const div of courseDivs) {
    const inputs = div.querySelectorAll("input");
    const name = inputs[0].value.trim();
    const grade = parseFloat(inputs[1].value);
    const credits = parseFloat(inputs[2].value);

    if (!name) {
      alert("Please enter course names.");
      return;
    }
    if (isNaN(grade) || grade < 0 || grade > 100) {
      alert("Please enter valid grades between 0 and 100.");
      return;
    }
    if (isNaN(credits) || credits <= 0) {
      alert("Please enter positive credits.");
      return;
    }

    newCoursesData.push({ name, grade, credits });

    totalWeightedGrades += grade * credits;
    totalCredits += credits;
  }

  if (totalCredits === 0) {
    alert("Total credits cannot be zero.");
    return;
  }

  // Save updated courses
  savedCourses = newCoursesData;
  saveCourses();

  const gpa = totalWeightedGrades / totalCredits;

  resultDiv.textContent = `Your GPA is: ${gpa.toFixed(2)} | Total Credits: ${totalCredits}`;
});


renderCourses();



