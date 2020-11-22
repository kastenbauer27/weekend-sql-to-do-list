console.log('JS is sourced');

$(document).ready(onReady);

// function to call jquery, establish click handlers, and get taskList on page load
function onReady() {
    console.log('jquery sourced and loaded!');
    getTasks();
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
    for (let task of taskList) {
        $('#taskList').append(`
        <tr>
        <td>${task.taskInfo}</td>
        <td>${task.complete}</td>
        </tr>
        `);
    }
}













