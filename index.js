const inputContainer = document.querySelector(".input-container");
const taskInput = inputContainer.querySelector(".task-input");
const addButton = inputContainer.querySelector(".add-button");

const taskContainer = document.querySelector(".task-container");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask(checked = false, task) {
  const newItem = document.createElement("li");
  newItem.classList.add("task-item");
  newItem.innerHTML = `<input type="checkbox" class="checkbox" />
          <span class="task-text">${task}</span>
          <button class="remove-item">&#10006;</button>`;
  const newCheckbox = newItem.querySelector(".checkbox");
  newCheckbox.checked = checked;
  taskContainer.appendChild(newItem);
}

function saveTask(checked, task) {
  //prepare for localstorage
  const taskIndex = tasks.length;
  let newTask = {};
  newTask.checked = checked;
  newTask.task = task;
  tasks.push({ ...newTask });

  //save to localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromStorage(task) {
  const selectedIndex = tasks.indexOf(task);
  tasks.splice(selectedIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function handleForm(e) {
  e.preventDefault();
  if (!taskInput.value) return;
  const alreadyExists = tasks.some((task) => task.task === taskInput.value);

  if (alreadyExists) {
    alert("it's already in the list");
    inputContainer.reset();
    return;
  }

  if (taskInput.value.length > 50) {
    alert("that's too long!!!");
    inputContainer.reset();
    return;
  }

  addTask(false, taskInput.value);
  saveTask(false, taskInput.value);
  inputContainer.reset();
}

function removeItem(e) {
  const listItem = e.target.closest(".task-item");
  if (listItem) {
    listItem.remove();
    removeFromStorage(listItem.querySelector(".task-text").textContent);
  }
}

function handleTaskContainer(e) {
  if (e.target.classList.contains("remove-item")) {
    removeItem(e);
  } else if (e.target.classList.contains("checkbox")) {
    const selectedItem = e.target.closest(".task-item");
    const selectedText = selectedItem.querySelector(".task-text").textContent;
    const selectedTask = tasks.find((task) => task.task === selectedText);
    selectedTask.checked = e.target.checked;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function populateTasks() {
  tasks.map((task) => addTask(task.checked, task.task));
}

populateTasks();

inputContainer.addEventListener("submit", handleForm);
taskContainer.addEventListener("click", handleTaskContainer);
