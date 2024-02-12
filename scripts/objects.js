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


const addButton = document.getElementById('btn-add');



function renderTask() {
    const blockThird = document.querySelector('.clear_button');
    blockThird.insertAdjacentHTML('afterbegin', `
        <form class="task_body" id="block-second">
            <input class='task_body-checkbox' type="checkbox" id="checkbox"/>
            <label class='task_body-label' type="text" id="label" for="checkbox">1.</label>
            <button class='task_body-btn' id="done">Done</button>
        </form>
    `)
}



function addTask() {
    let inputValue = document.getElementById('input-text');
    let labelTask = document.getElementById('label');

    labelTask.textContent = inputValue.value
    inputValue.placeholder = 'Next ToDo...';
    inputValue.value = '';
    crossOutTask()
    deleteOneEvent()
}



function crossOutTask() {
    let checkbox = document.getElementById('checkbox');
    let label = document.getElementById('label');

    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            label.style.textDecoration = "line-through";
        } else {
            label.style.textDecoration = "none";
        }
    })
}



function deleteOneEvent() {
    const buttonDone = document.getElementById('done');
    let labelTask = document.getElementById('label');

    buttonDone.addEventListener('click', (event) => {
        labelTask.textContent = '';
        event.preventDefault();
    })
}


const btnClear = document.getElementById('btn-clear');



function clearAll() {
    const blockForDelete = document.querySelectorAll('.task_body');
    console.log(blockForDelete);
    for (let i = 0; i < blockForDelete.length; i++) {
        blockForDelete[i].remove();
    }
}



function pressButtonEnter(event) {
    if (event.code === "Enter") {
        console.log('Enter pressed');
    }
}



function setLocalStorage() {
    let inputValue = document.getElementById('input-text');

    localStorage.setItem('toDo', inputValue.value.toString());
}



function getLocalStorage() {
    console.log(localStorage.getItem('toDo'))
}



btnClear.addEventListener('click', clearAll);

addButton.addEventListener('click', renderTask);
addButton.addEventListener('click', addTask);
addButton.addEventListener('keydown', pressButtonEnter);
addButton.addEventListener('keyup', pressButtonEnter);

addButton.addEventListener('click', setLocalStorage);
addButton.addEventListener('click', getLocalStorage);
