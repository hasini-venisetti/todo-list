document.addEventListener('DOMContentLoaded', function() {
  const taskList = document.getElementById('taskList');
  const clearAllTasksBtn = document.getElementById('clearAllTasks');
  const addForm = document.getElementById('addForm');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = 'task-card list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <span><strong>${task.taskName}</strong> - ${task.priority} - ${task.dueDate}</span>
        <button class="delete-btn btn-sm" data-index="${index}">Delete</button>
      `;
      taskList.appendChild(li);
    });
    attachDeleteListeners();
  }

  function attachDeleteListeners() {
    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        deleteTask(index);
      });
    });
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = document.getElementById('item').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('dueDate').value;

    if (taskName && description && priority && dueDate) {
      const task = { taskName, description, priority, dueDate };
      tasks.push(task);
      saveTasks();
      renderTasks();
      addForm.reset();
    }
  });

  if (clearAllTasksBtn) {
    clearAllTasksBtn.addEventListener('click', function () {
      tasks = [];
      saveTasks();
      renderTasks();
    });
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  renderTasks();
});
