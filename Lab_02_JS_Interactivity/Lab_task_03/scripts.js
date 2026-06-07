function toggleComplete(taskNumber) {
    const taskElement = document.getElementById(`task${taskNumber}`);
    const taskInput = taskElement.querySelector('.task-input');
    const completeBtn = taskElement.querySelector('.complete-btn');
    
    if (taskElement.classList.contains('completed')) {
        taskElement.classList.remove('completed');
        taskInput.classList.remove('completed');
        completeBtn.textContent = '✓ Complete';
        completeBtn.classList.remove('uncomplete-btn');
    } else {
        taskElement.classList.add('completed');
        taskInput.classList.add('completed');
        completeBtn.textContent = '↺ Undo';
        completeBtn.classList.add('uncomplete-btn');
    }
    
    updateStyles();
    updateStats();
}

function removeTask(taskNumber) {
    const taskElement = document.getElementById(`task${taskNumber}`);
    taskElement.style.display = 'none';
    updateStats();
}

function updateStyles() {
    const allTasks = document.querySelectorAll('.task-item');
    
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        const input = task.querySelector('.task-input');
        
        if (task.classList.contains('completed')) {
            input.style.textDecoration = 'line-through';
            input.style.color = '#6c757d';
            input.style.opacity = '0.7';
        } else {
            input.style.textDecoration = 'none';
            input.style.color = '#333';
            input.style.opacity = '1';
        }
    }
}

function updateStats() {
    const allTasks = document.querySelectorAll('.task-item');
    let totalVisible = 0;
    let completed = 0;
    
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].style.display !== 'none') {
            totalVisible++;
            if (allTasks[i].classList.contains('completed')) {
                completed++;
            }
        }
    }
    
    const remaining = totalVisible - completed;
    const statsElement = document.getElementById('stats');
    statsElement.textContent = `Total Tasks: ${totalVisible} | Completed: ${completed} | Remaining: ${remaining}`;
}

function resetAll() {
    const allTasks = document.querySelectorAll('.task-item');
    
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        const input = task.querySelector('.task-input');
        const completeBtn = task.querySelector('.complete-btn');
        
        task.style.display = 'flex';
        task.classList.remove('completed');
        input.classList.remove('completed');
        input.style.textDecoration = 'none';
        input.style.color = '#333';
        input.style.opacity = '1';
        completeBtn.textContent = '✓ Complete';
        completeBtn.classList.remove('uncomplete-btn');
    }
    
    updateStats();
}

window.onload = function() {
    updateStats();
};
