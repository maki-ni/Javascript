const taskName = document.getElementById("task");
const dueDate = document.getElementById("date");
const submit_btn = document.getElementById("submit");
const list = document.querySelector("#table-body");
const trash = document.querySelector(".fa-trash");
const info = document.querySelector(".inform");

//adds the written task to the local storage
function writeTask() {
  if (!taskName.value || !dueDate.value) {
    info.textContent = "fill the blanks";
    setTimeout(() => {
      info.remove();
      taskName.value = "";
      dueDate.value = "";
    }, 2000);
    return;
  }
  const new_row = document.createElement("tr");

  new_row.innerHTML = `<td>${taskName.value}</td>
  <td>${dueDate.value}</td><td><i class="fa-solid fa-trash"></i><td>`;
  list.appendChild(new_row);
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ taskName: taskName.value, dueDate: dueDate.value });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskName.value = "";
  dueDate.value = "";
}

//loads the task from the local storage to the UI
function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const new_row = document.createElement("tr");
    new_row.innerHTML = `<td>${task.taskName}</td>
  <td>${task.dueDate}</td><td><i class="fa-solid fa-trash" data-index="${index}"></i><td>`;
    list.appendChild(new_row);
  });
}
function deleteTask(e) {
  if (!e.target.classList.contains("fa-trash")) {
    return;
  }
  const btn = e.target;
  const taskIndex = btn.dataset.index;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(taskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  btn.closest("tr").remove();
}
document.addEventListener("DOMContentLoaded", loadTask);
submit_btn.addEventListener("click", writeTask);
list.addEventListener("click", deleteTask);
