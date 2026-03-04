function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("username");
  location.href = "../index.html";
}

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
  document.getElementById("userName").textContent = currentUser.username;
}

function addTask(event) {
  event.preventDefault();

  const inputTask = document.getElementById("task-input");
  const inputDesc = document.getElementById("task-desc");

  const inputText = inputTask.value.trim();
  const inputDescription = inputDesc.value.trim();

  if (!inputText) {
    alert("Task Title is Empty");
    return;
  }

  const newTask = {
    id: Date.now(),
    title: inputText,
    description: inputDescription, // ✅ description added
    iscompleted: false,
    createdBy: {
      username: currentUser.username,
      email: currentUser.email,
    },
  };

  const alltasks = JSON.parse(localStorage.getItem("tasks")) || [];
  alltasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(alltasks));

  inputTask.value = "";
  inputDesc.value = "";

  showtask();
}

function showtask() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const alltasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const userTasks = alltasks.filter(
    (task) => task.createdBy.email === currentUser.email
  );

  userTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
      <div>
        <strong>${task.title}</strong>
        <p class="mb-1 text-muted">${task.description || ""}</p>
      </div>

      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" onclick="editTask(${task.id})">✏️</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${task.id})">🗑️</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

showtask();

// Delete Task
function deleteTask(taskId) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");
  if (!confirmDelete) return;

  const alltasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const updatedTask = alltasks.filter(
    (task) =>
      !(task.id === taskId && task.createdBy.email === currentUser.email)
  );

  localStorage.setItem("tasks", JSON.stringify(updatedTask));
  showtask();
}

function editTask(taskId) {
  const alltasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const taskIndex = alltasks.findIndex(
    (task) => task.id === taskId && task.createdBy.email === currentUser.email
  );

  if (taskIndex === -1) {
    alert("Item not found");
    return;
  }

  const newTitle = prompt("Edit task title", alltasks[taskIndex].title);
  if (!newTitle || newTitle.trim() === "") {
    alert("Task title cannot be empty");
    return;
  }

  const newDescription = prompt(
    "Edit task description",
    alltasks[taskIndex].description || ""
  );

  alltasks[taskIndex].title = newTitle.trim();
  alltasks[taskIndex].description = newDescription?.trim() || "";

  localStorage.setItem("tasks", JSON.stringify(alltasks));
  showtask();
}