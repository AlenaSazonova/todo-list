function templateToDoList() {
    const block = document.createElement('div');
    block.classList.add('block');
    block.insertAdjacentHTML('afterbegin', `
        <div class="block__title">
            <h1 class="block__title-title">ToDo List</h1>
        </div>
        
        <div class="task_creator">
                <input class='task_creator-input' id='input-text' type="search" placeholder="Add a ToDo...">
                <button class='task_creator-btn' id="btn-add">Add</button>
        </div>

        <div class="clear_button">
            <button class='clear_button-btn' id="btn-clear">Clear List</button>
        </div>
    `)
    const menu = document.querySelector('.menu');
    menu.append(block);
}
templateToDoList()



const addBTN = document.querySelector('.task_creator-btn');



function addTask() {
    const taskCreator = document.querySelector('.task_creator');
    const taskBody = document.createElement('div');
    taskBody.classList.add('task_body');
    taskCreator.after(taskBody);

    const inputValue = document.querySelector('.task_creator-input');
    taskBody.innerHTML = taskTemplate(inputValue.value);

    inputValue.placeholder = 'Next ToDo...';
    inputValue.value = '';

    crossOutTask();
    deleteTask();
    editTask();
}



function taskTemplate(task) {
    return `
        <form class="task" id="block-second">
            <input class='task_checkbox' type="checkbox" id="checkbox"/>
            <label class='task_label' type="text" id="label">${task}</label>
            <button class='task_btn-edit'>Edit</button>
            <button class='task_btn' id="done">Done</button>
        </form>
    `
}



function crossOutTask() {
    let checkboxes = document.querySelectorAll('.task_checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            let label = this.nextElementSibling;
            if (this.checked) {
                label.style.textDecoration = "line-through";
            } else {
                label.style.textDecoration = "none";
            }
        })
    })
}



function deleteTask() {
    const doneBTN = document.querySelector('.task_btn');
    let taskBody = document.querySelector('.task_body');
    
    doneBTN.addEventListener('click', (event) => {
        event.preventDefault();
        taskBody.textContent = '';
    })
}



function editTask() {
    let editBTN = document.querySelectorAll('.task_btn-edit');

    editBTN.forEach(editBTN => {
        let label = editBTN.parentElement.querySelector('.task_label');
        //console.log(label)

        editBTN.addEventListener('click', (event) => {
            event.preventDefault();
            //console.log(event.target)
            label.setAttribute('contentEditable', true);

            if (editBTN.innerText === 'Save') {
                editBTN.innerText = "Edit";
                label.removeAttribute('contentEditable');
            } else {
                editBTN.innerText = "Save";
            }
        });
    });
}



const btnClear = document.getElementById('btn-clear');



function clearAll() {
    const blockForDelete = document.querySelectorAll('.task');
    for (let i = 0; i < blockForDelete.length; i++) {
        blockForDelete[i].remove();
    }
}



function pressButtonEnter(event) {
    
    if (event.code === "Enter") { //event.keyCode === 13
        console.log('Enter pressed');
        //addTask();
    }
}



function setLocalStorage() {
    let tasks = [];
    let labelValue = document.querySelectorAll('.task_label');
    console.log(labelValue);

    for (let i = 0; i < labelValue.length; i++) {
        tasks.push(labelValue[i].innerHTML)
    }
    localStorage.setItem('toDo', JSON.stringify(tasks));
}



function getLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('toDo'));
    console.log(tasks);
}


window.addEventListener('DOMContentLoaded', function() { 
    if (localStorage.getItem('toDo')) {
        getLocalStorage();
    } else {
        setLocalStorage();
        getLocalStorage();
    }
})




btnClear.addEventListener('click', clearAll);

addBTN.addEventListener('click', addTask);
addBTN.addEventListener('keydown', pressButtonEnter);
addBTN.addEventListener('click', setLocalStorage);
