// --------------------
// Course Data
// --------------------
const courses = [
  {
    id: 1,
    title: "HTML Basics",
    description: "Learn the building blocks of the web: HTML tags, structure, and best practices.",
    lessons: ["Introduction to HTML", "HTML Elements", "Creating Forms", "Links & Images"],
    completed: false
  },
  {
    id: 2,
    title: "CSS Fundamentals",
    description: "Style your websites beautifully using CSS selectors, properties, and layouts.",
    lessons: ["Selectors and Colors", "Box Model", "Flexbox & Grid", "Responsive Design"],
    completed: false
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    description: "Make your website dynamic and interactive using core JavaScript concepts.",
    lessons: ["Variables & Data Types", "Functions", "DOM Manipulation", "Events"],
    completed: false
  }
];

// --------------------
// Elements
// --------------------
const loginPage = document.getElementById("loginPage");
const homePage = document.getElementById("homePage");
const courseList = document.getElementById("courseList");
const courseDetail = document.getElementById("courseDetail");
const courseTitle = document.getElementById("courseTitle");
const courseDescription = document.getElementById("courseDescription");
const lessonList = document.getElementById("lessonList");
const completeBtn = document.getElementById("completeBtn");
const backBtn = document.getElementById("backBtn");
const progressBar = document.getElementById("progressBar");

let currentCourse = null;

// --------------------
// Login Handling
// --------------------
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("loggedInUser", username);
    showHomePage();
  } else {
    alert("Please enter your username and password!");
  }
});

// If user already logged in
window.addEventListener("load", () => {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    showHomePage();
  }
});

function showHomePage() {
  loginPage.style.display = "none";
  homePage.style.display = "block";
  displayCourses();
}

// --------------------
// Course Display
// --------------------
function displayCourses() {
  courseList.innerHTML = "";
  courses.forEach((course) => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <p><strong>Status:</strong> ${course.completed ? "✅ Completed" : "⏳ In Progress"}</p>
    `;
    card.addEventListener("click", () => openCourse(course.id));
    courseList.appendChild(card);
  });
}

// --------------------
// Course Detail View
// --------------------
function openCourse(id) {
  const course = courses.find((c) => c.id === id);
  currentCourse = course;
  homePage.style.display = "none";
  courseDetail.style.display = "block";

  courseTitle.textContent = course.title;
  courseDescription.textContent = course.description;
  lessonList.innerHTML = "";
  course.lessons.forEach((lesson) => {
    const li = document.createElement("li");
    li.textContent = lesson;
    lessonList.appendChild(li);
  });

  updateProgress();
}

// --------------------
// Buttons
// --------------------
completeBtn.addEventListener("click", () => {
  if (currentCourse) {
    currentCourse.completed = true;
    updateProgress();
    alert(`${currentCourse.title} marked as completed!`);
  }
});

backBtn.addEventListener("click", () => {
  courseDetail.style.display = "none";
  homePage.style.display = "block";
  displayCourses();
});

// --------------------
// Progress Bar
// --------------------
function updateProgress() {
  progressBar.style.width = currentCourse.completed ? "100%" : "40%";
}
