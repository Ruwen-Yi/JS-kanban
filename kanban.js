
document.addEventListener('click', handleClick);

let taskTarget = null;
let oldContent = '';
function handleClick(event) {

    if (event.target.closest('.board-body-task-add-btn')){
        if (taskTarget) return;
        
        addTask(event.target.closest('.board-body-task-add-btn'));
        return;
    }
    
    if (event.target.classList.contains('board-body-task-content')){

        // console.log(taskTarget);
        if (taskTarget && taskTarget != event.target) return;

        if (!oldContent) oldContent = event.target.innerHTML;

        editTask(event.target);
        showBtn(event.target.closest('.board-body-task'));

        taskTarget = event.target;
        
        return;
    }

    if (event.target.classList.contains('board-save-btn')){
        saveEdit();
        removeBtn();

        taskTarget = null;
        return;
    }

    if (event.target.classList.contains('board-cancel-btn')){
        cancelEdit(taskTarget, oldContent);
        removeBtn();
        
        taskTarget = null;
        return;
    }

}

function addTask(target) {
    let div = document.createElement('div');
    div.classList.add('board-body-task');

    div.innerHTML = `
        <div class="board-body-task-to-left">&lt;</div>
        <span class="board-body-task-content" contenteditable="true">Task</span>
        <div class="board-body-task-to-right">&gt;</div>
        `
                    
    target.before(div);
}

function editTask(taskTarget) {
    taskTarget.onblur = taskTarget.focus;
}

function saveEdit() {
    taskTarget.onblur = '';
    taskTarget.blur();

    oldContent = '';
    return;
}

function cancelEdit(taskTarget, oldContent) {
    taskTarget.onblur = '';
    taskTarget.blur();

    taskTarget.innerHTML = oldContent;

    return;
}

function showBtn(taskCard) {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];
    taskCard.after(btn);
    btn.hidden = false;

    return;
}

function removeBtn() {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];

    btn.hidden = true;

    return;
}