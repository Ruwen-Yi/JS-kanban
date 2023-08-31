
document.addEventListener('click', handleClick, {passive: true});

let templateTextArea = document.getElementById('template-text-area');
let taskTarget = null;
let oldContent = '';
function handleClick(event) {

    if (event.target.closest('.board-body-task-add-btn')){
        
        if (taskTarget) return;
        addTask(event.target.closest('.board-body-task-add-btn'));
        
        return;
    }
    
    if (event.target.classList.contains('board-body-task-content')){

        if (taskTarget && taskTarget != event.target) return;

        // save the original task content.
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
        cancelEdit();
        removeBtn();
        
        taskTarget = null;

        return;
    }

}

/**
 * this function adds a task card above the add-task button being clicked.
 * @param {HTMLDivElement} target the div box that represents an add-task button.
 */
function addTask(target) {
    let div = document.createElement('div');
    div.classList.add('board-body-task');

    div.innerHTML = `
        <div class="board-body-task-to-left">&lt;</div>
        <span class="board-body-task-content">Task</span>
        <div class="board-body-task-to-right">&gt;</div>
        `
                    
    target.before(div);
}

/**
 * since the span is editable due to 'contenteditable' attribute,
 * here only need to make sure the span is focused when editing.
 * @param {HTMLSpanElement} taskTarget 
 */
function editTask(taskTarget) {
    // get <textare> from template and populate it with task content.
    let textArea = templateTextArea.content.cloneNode(true).firstElementChild;
    textArea.value = oldContent;

    // append the <textare> node into the taskCard
    taskTarget.innerHTML = '';
    taskTarget.append(textArea);

    // to improve ux, focus on textarea.
    textArea.focus();

    taskTarget.onblur = taskTarget.focus;
    return;
}

/**
 * since the span is editable due to 'contenteditable' attribute,
 * the new task content will be save automatically. 
 * this function makes sure the span is blured 
 * and remove the onblur listener when finish editing.
 */
function saveEdit() {
    taskTarget.onblur = '';
    taskTarget.blur();

    taskTarget.innerHTML = taskTarget.firstElementChild.value;
    oldContent = '';
    return;
}

/**
 * 
 * @param {HTMLSpanElement} taskTarget the task span being edited.
 * @param {string} oldContent the original task content before editing.
 * @returns 
 */
function cancelEdit() {
    taskTarget.onblur = '';
    taskTarget.blur();

    taskTarget.innerHTML = oldContent;
    oldContent = '';

    return;
}

/**
 * this function shows the save/cancel buttons under the task card.
 * @param {HTMLSpanElement} taskCard the whole task card whose task content is being edited.
 */
function showBtn(taskCard) {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];
    taskCard.after(btn);
    
    btn.hidden = false;

    return;
}

/**
 * this function removes the save/cancel buttons under the task card.
 */
function removeBtn() {
    let btn = document.getElementsByClassName('board-body-task-btns')[0];
    btn.hidden = true;

    return;
}

/**
 * handle the event when user click the toLeft/Right Arrow
 */
document.addEventListener('click', handleArrowClick, {passive: true});

/**
 * 
 * @param {MouseEvent} event a click event
 */
function handleArrowClick(event){
    if (event.target.classList.contains('board-body-task-to-left')){
        handleLeftArrow(event.target.closest('.board-body-task'));
    }
    else if (event.target.classList.contains('board-body-task-to-right')){
        handleRightArrow(event.target.closest('.board-body-task'));
    }
}

/**
 * 
 * @param {HTMLSpanElement} taskCard the taskCard whose toLeft arrow is clicked
 */
function handleLeftArrow(taskCard) {
    let board = taskCard.closest('.board');
    let boardName = board.classList.item(1);

    let targetBoard = document.getElementsByClassName(`${leftBoard[boardName]}`)[0];
    
    let targetBoardTitle = targetBoard.getElementsByClassName('board-title')[0];

    targetBoardTitle.after(taskCard);
}

/**
 * 
 * @param {HTMLSpanElement} taskCard the taskCard whose toRight arrow is clicked
 */
function handleRightArrow(taskCard) {
    let board = taskCard.closest('.board');
    let boardName = board.classList.item(1);

    let targetBoard = document.getElementsByClassName(`${rightBoard[boardName]}`)[0];
    
    let targetBoardTitle = targetBoard.getElementsByClassName('board-title')[0];

    targetBoardTitle.after(taskCard);
}

let rightBoard = {
    'board-to-do': 'board-doing',
    'board-doing': 'board-done',
    'board-done': 'board-approved',
    'board-approved':'board-to-do'
}

let leftBoard = {
    'board-to-do':'board-approved',
    'board-doing':'board-to-do',
    'board-done':'board-doing',
    'board-approved':'board-done'
}