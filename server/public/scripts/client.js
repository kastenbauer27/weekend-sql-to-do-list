console.log('JS is sourced');

$(document).ready(onReady);

// function to call jquery, establish click handlers, and get taskList on page load
function onReady() {
    console.log('jquery sourced and loaded!');
    getTasks();
    $('#submitBtn').on('click', handleSubmit);
    $('#taskList').on('click', '.deleteBtn', function(event) {
        let taskId = $(this).closest('tr').data('id');
        console.log('clicked delete button for task with id:', taskId);
        removeTask(taskId);
    });
}

function removeTask(idToRemove) {
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${idToRemove}`
    }).then( response => {
        getTasks();
    }).catch( err => {
        console.log('error in delete', err);
        alert('Unable to delete task, please try again later.')
    })
}

// prevents default form attributes, gets input value into an object and passes it to addTask
function handleSubmit(event) {
    event.preventDefault();
    console.log('click on addTask button!');
    let newTask = {
        description: $('#task-in').val(),
    };
    $('#task-in').val('');
    addTask(newTask);
}

// POST request to server with task object as data, calls getTasks to refresh list after response
function addTask(taskToAdd) {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    }).then( response => {
        console.log('Response from server', response);
        getTasks();
    }).catch( err => {
        console.log('error in adding task', err);
        alert('Unable to add task right now, please try again later.');
    })
}

// function to send GET request to server, gets response of all tasks
function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( response => {
        let tasks = response;
        console.log(tasks);
        renderTaskList(tasks);
    }).catch( err => {
        console.log('Error in getting tasks', err);
    })
}

// function to append all tasks from database to DOM
function renderTaskList(taskList) {
    $('#taskList').empty();
    
    for (let task of taskList) {
        $('#taskList').append(`
        <tr data-id=${task.id}>
        <td>${task.taskInfo}</td>
        <td><input type="checkbox" class="markComplete"></input></td>
        <td><button class="deleteBtn">Delete</button></td>
        </tr>
        `);
    }
}














