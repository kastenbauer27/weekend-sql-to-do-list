console.log('JS is sourced');

$(document).ready(onReady);

function onReady() {
    console.log('jquery sourced and loaded!');
    getTasks();
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then( response => {
        let taskList = response;
        console.log(taskList);
    }).catch( err => {
        console.log('Error in getting tasks', err);
    })
}














