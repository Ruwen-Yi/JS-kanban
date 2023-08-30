
document.addEventListener('click', handleClick);

let taskTarget;
let oldContent = null;
function handleClick(event) {
    
    if (event.target.classList.contains('board-body-task')){
        showBtn();

        if (!oldContent) oldContent = event.target.innerHTML;
        taskTarget = editTask(event.target);
        
        return;
    }

    if (event.target.classList.contains('board-save-btn')){
        saveEdit(taskTarget);
        removeBtn();

        return;
    }

    if (event.target.classList.contains('board-cancel-btn')){
        cancelEdit(taskTarget, oldContent);
        removeBtn();
        
        return;
    }

}

function editTask(taskTarget) {
    taskTarget.onblur = taskTarget.focus;
    
    return taskTarget;
}

function saveEdit(taskTarget) {
    taskTarget.onblur = '';
    taskTarget.blur();

    return;
}

function cancelEdit(taskTarget, oldContent) {
    taskTarget.onblur = '';
    taskTarget.blur();

    taskTarget.innerHTML = oldContent;

    return;
}

function showBtn() {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];

    btn.hidden = false;

    return;
}

function removeBtn() {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];

    btn.hidden = true;

    return;
}