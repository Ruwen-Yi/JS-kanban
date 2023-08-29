let isBtnClicked = false;
document.addEventListener('click', (e)=>{
    
    if (!e.target.classList.contains('board-body-task')){
        return;
    }

    e.target.onblur = ()=>{

        if(isBtnClicked) {
            e.target.onblur = '';
            e.target.blur();
            return;
        }
        
        e.target.focus();
    }
})

let saveBtn = document.getElementsByClassName('board-save-btn')[0];

saveBtn.onclick = ()=>{
    isBtnClicked = true;
}
