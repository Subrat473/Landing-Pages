document.addEventListener('DOMContentLoaded', function() {

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category-select');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggle = document.getElementById('theme-toggle');
    

    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');
    const pendingTasksElement = document.getElementById('pending-tasks');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'light';
    
    renderTasks();
    updateStats();
    
 s
    taskForm.addEventListener('submit', addTask);
    themeToggle.addEventListener('change', toggleTheme);
    

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.filter;
            renderTasks();
        });
    });
    
    
    function addTask(e) {
        e.preventDefault();
        
        const taskText = taskInput.value.trim();
        const taskCategory = categorySelect.value;
        
        if (taskText) {
            const newTask = {
                id: Date.now(),
                text: taskText,
                category: taskCategory,
                completed: false
            };
            
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            updateStats();
            
            
            taskInput.value = '';
            taskInput.focus();
        }
    }
    
    function renderTasks() {
      
        taskList.innerHTML = '';
       
        let filteredTasks = tasks;
        if (currentFilter !== 'all') {
            filteredTasks = tasks.filter(task => task.category === currentFilter);
        }
        
        if (filteredTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = currentFilter === 'all' ? 'No tasks yet. Add one above!' : `No ${currentFilter} tasks.`;
            taskList.appendChild(emptyState);
            return;
        }
        
      
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.dataset.id = task.id;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="task-category ${task.category}">${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
                <button class="delete-btn">×</button>
            `;
            
            taskList.appendChild(taskItem);
            
            const checkbox = taskItem.querySelector('.task-checkbox');
            const deleteBtn = taskItem.querySelector('.delete-btn');
            const taskText = taskItem.querySelector('.task-text');
            
            checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
        });
    }
    
    function toggleTaskComplete(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        updateStats();
        
       
        const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (taskItem) {
            const taskText = taskItem.querySelector('.task-text');
            taskText.classList.toggle('completed');
        }
    }
    
    function deleteTask(taskId) {
        const taskItem = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.classList.add('fade-out');
            
        
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== taskId);
                saveTasks();
                renderTasks();
                updateStats();
            }, 300);
        }
    }
    
    function updateStats() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        
        totalTasksElement.textContent = totalTasks;
        completedTasksElement.textContent = completedTasks;
        pendingTasksElement.textContent = pendingTasks;
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    function toggleTheme() {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
});