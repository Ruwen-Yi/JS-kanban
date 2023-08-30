
document.addEventListener('click', handleClick);

let taskTarget;
let oldContent = '';
let isEditing;
function handleClick(event) {

    if (event.target.classList.contains('board-body-task-add-btn')){
        addTask(event.target);
        return;
    }
    
    if (event.target.classList.contains('board-body-task')){
        if (isEditing) return;
                
        if (!oldContent) oldContent = event.target.innerHTML;
        taskTarget = editTask(event.target);

        showBtn(event.target);
        
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

function addTask(target) {
    let div = document.createElement('div');
    div.classList.add('board-body-task');
    div.setAttribute('contenteditable','true');

    let span = document.createElement('span');
    span.classList.add('board-body-task-content');
    span.textContent = 'Task';
    
    div.append(span);
    target.before(div);
}

function editTask(taskTarget) {
    isEditing = true;
    taskTarget.onblur = taskTarget.focus;
    
    return taskTarget;
}

function saveEdit(taskTarget) {
    isEditing = false;

    taskTarget.onblur = '';
    taskTarget.blur();

    oldContent = '';

    return;
}

function cancelEdit(taskTarget, oldContent) {
    isEditing = false;
    
    taskTarget.onblur = '';
    taskTarget.blur();

    taskTarget.innerHTML = oldContent;

    return;
}

function showBtn(taskTarget) {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];
    taskTarget.after(btn);
    btn.hidden = false;

    return;
}

function removeBtn() {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];

    btn.hidden = true;

    return;
}