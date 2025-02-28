const completeButtons = document.querySelectorAll('.complete-btn');
const activityLog = document.querySelector('#activity-log');
const taskCount = document.querySelector('#task-count');
const totalTask = document.querySelector('#total-task');
const clearHistoryBtn = document.querySelector('#clear-history-btn');

let savedLog = localStorage.getItem('activityLog') || "No recent activity.";
activityLog.innerHTML = savedLog;

let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

completeButtons.forEach(button => {
    const taskName = button.parentElement.parentElement.querySelector('h3').textContent;
    if (completedTasks.includes(taskName)) {
        button.disabled = true;
        button.classList.add("bg-gray-400", "cursor-not-allowed");
    }
});

taskCount.textContent = completedTasks.length;
totalTask.textContent = completeButtons.length - completedTasks.length;

completeButtons.forEach(button => {
    button.addEventListener('click', function () {
        this.disabled = true;
        this.classList.add("bg-gray-400", "cursor-not-allowed");

        const currentDate = new Date().toLocaleString();
        const taskName = this.parentElement.parentElement.querySelector('h3').textContent;
        const logEntry = `✅ Completed: "${taskName}" on ${currentDate}.<br>`;

        activityLog.innerHTML = activityLog.innerHTML === "No recent activity." ? logEntry : logEntry + activityLog.innerHTML;

        localStorage.setItem('activityLog', activityLog.innerHTML);
        completedTasks.push(taskName);
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

        totalTask.textContent = completeButtons.length - completedTasks.length;
        taskCount.textContent = completedTasks.length;
    });
});

clearHistoryBtn.addEventListener('click', function () {
    localStorage.removeItem('activityLog');
    localStorage.removeItem('completedTasks');
    activityLog.innerHTML = "No recent activity.";

    completeButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("bg-gray-400", "cursor-not-allowed");
        button.classList.add("bg-blue-500");
    });

    totalTask.textContent = completeButtons.length;
    taskCount.textContent = "0";
});

document.querySelector('#current-date').textContent = new Date().toDateString();
