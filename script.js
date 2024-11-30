let taskInputField = document.getElementById("new-task");

let addTaskButton = document.getElementsByTagName("button")[0];

let pendingTasksList = document.getElementById("incomplete-tasks");

let finishedTasksList = document.getElementById("completed-tasks");

// Creates a task list item with the necessary elements
let createTaskElement = function (taskDescription) {
    let listItem = document.createElement("li");

    let taskCheckbox = document.createElement("input");
    let taskLabel = document.createElement("label");
    let editTextField = document.createElement("input");
    let editTaskButton = document.createElement("button");
    let deleteTaskButton = document.createElement("button");

    taskLabel.innerText = taskDescription;

    taskCheckbox.type = "checkbox";
    editTextField.type = "text";
    editTextField.style.display = "none"; // Hide the input field initially

    editTaskButton.innerText = "Edit";
    editTaskButton.className = "edit";
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.className = "delete";

    listItem.appendChild(taskCheckbox);
    listItem.appendChild(taskLabel);
    listItem.appendChild(editTextField);
    listItem.appendChild(editTaskButton);
    listItem.appendChild(deleteTaskButton);

    return listItem;
};

// Adds a new task to the pending tasks list
let addTaskToList = function () {
    let listItem = createTaskElement(taskInputField.value);

    if (taskInputField.value === "") {
        return;
    }

    pendingTasksList.appendChild(listItem);
    bindTaskActions(listItem, moveToCompleted);

    taskInputField.value = "";
};

// Toggles between edit and view modes for a task
let toggleEditTask = function () {
    let listItem = this.parentNode;

    let editTextField = listItem.querySelector('input[type=text]');
    let taskLabel = listItem.querySelector("label");
    let isEditMode = listItem.classList.contains("editMode");

    if (isEditMode) {
        // Save the changes and hide the input field
        taskLabel.innerText = editTextField.value;
        editTextField.style.display = "none";
        taskLabel.style.display = "inline";
    } else {
        // Show the input field and populate it with the current task text
        editTextField.value = taskLabel.innerText;
        editTextField.style.display = "inline";
        taskLabel.style.display = "none";
    }

    listItem.classList.toggle("editMode");
};

// Removes a task from its list
let removeTask = function () {
    let listItem = this.parentNode;
    let parentList = listItem.parentNode;

    parentList.removeChild(listItem);
};

// Moves a task to the completed tasks list
let moveToCompleted = function () {
    let listItem = this.parentNode;
    finishedTasksList.appendChild(listItem);
    bindTaskActions(listItem, moveToPending);
};

// Moves a task back to the pending tasks list
let moveToPending = function () {
    let listItem = this.parentNode;
    pendingTasksList.appendChild(listItem);
    bindTaskActions(listItem, moveToCompleted);
};

// Binds event handlers to task item buttons and checkbox
let bindTaskActions = function (taskItem, checkboxHandler) {
    let taskCheckbox = taskItem.querySelector("input[type=checkbox]");
    let editButton = taskItem.querySelector("button.edit");
    let deleteButton = taskItem.querySelector("button.delete");

    editButton.onclick = toggleEditTask;
    deleteButton.onclick = removeTask;
    taskCheckbox.onchange = checkboxHandler;
};

// Add event listener to the Add Task button
addTaskButton.addEventListener("click", addTaskToList);
addTaskButton.addEventListener("click", ajaxRequest);

// Bind existing tasks in the pending tasks list
for (let i = 0; i < pendingTasksList.children.length; i++) {
    bindTaskActions(pendingTasksList.children[i], moveToCompleted);
}

// Bind existing tasks in the completed tasks list
for (let i = 0; i < finishedTasksList.children.length; i++) {
    bindTaskActions(finishedTasksList.children[i], moveToPending);
}
