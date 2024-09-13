const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const newTaskQuantity = document.getElementById('newQuantity');
    const prioritySelect = document.getElementById('priority');
    const addTaskBtn = document.getElementById('addTaskBtn');

    // Load tasks from localStorage
    window.addEventListener('load', loadTasksFromStorage);

    function loadTasksFromStorage() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => {
        addTaskToDOM(task.text, task.priority, task.date, task.completed);
      });
    }

    function addTaskToDOM(taskText, priority, taskDate, completed) {
      const taskItem = document.createElement('li');
      taskItem.classList.toggle('completed', completed);
      taskItem.innerHTML = `
        <span>${taskText}</span>
        <span class="quantity">${document.getElementById('newQuantity').innerHTML}</span>
        <span class="${priority}">${priority}</span>
        <span class="added">${taskDate}</span>
        <button class="completeBtn">☑</button>
        <button class="deleteBtn">🗑️</button>
      `;
      taskList.appendChild(taskItem);

      const completeBtn = taskItem.querySelector('.completeBtn');
      completeBtn.addEventListener('click', () => {
        taskItem.classList.toggle('completed');
        updateTaskInStorage(taskText, taskItem.classList.contains('completed'));
      });

      const deleteBtn = taskItem.querySelector('.deleteBtn');
      deleteBtn.addEventListener('click', () => {
        removeTaskFromDOM(taskItem);
        removeTaskFromStorage(taskText);
      });
    }

    function saveTaskToStorage(taskText, priority, taskDate, completed) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push({ text: taskText, priority: priority, date: taskDate, completed: completed });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskInStorage(taskText, completed) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskIndex = tasks.findIndex(task => task.text === taskText);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }

    function removeTaskFromDOM(taskItem) {
      taskList.removeChild(taskItem);
    }

    function removeTaskFromStorage(taskText) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const taskIndex = tasks.findIndex(task => task.text === taskText);
      if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }

    addTaskBtn.addEventListener('click', () => {
      const taskText = newTaskInput.value;
      const priority = prioritySelect.value;
      const taskDate = new Date().toLocaleDateString();
      if (taskText !== '') {
        addTaskToDOM(taskText, priority, taskDate, false);
        saveTaskToStorage(taskText, priority, taskDate, false);
        newTaskInput.value = '';
        prioritySelect.value = 'H'; // Reset priority to high
      }
    });