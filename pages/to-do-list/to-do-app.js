// export {Display, }

window.addEventListener('DOMContentLoaded', ()=> {  
     

    const inputBox = document.querySelector('.to-do-input');
    const addBtn = document.querySelector('.to-do-add-btn');
    const toDoContainer = document.querySelector('.to-do-container');    

    let toDoTasks = [];

    // Empty Input Popup
    const emptyInputPopup = document.querySelector('.empty-input-popup');      


    //------- Functions for Warning Empty Input -------//
    function showEmptyInputPopup(){
        emptyInputPopup.style.display = 'block';
    }
    function closeEmptyInputPopup(){
        emptyInputPopup.style.display = 'none'
    }


    //------- Classes -------//

    //Class to create to do task and push it to the to do task array
    class ToDoTask{
        constructor(task){
            this.task = task;
        }
        createId(id){
            this.id = id; 
        }
    }

    // Class to add to do task - Display it, Delete and Done/Undone it
    class Display{
        static addTask(){
            if(inputBox.value === ""){
                showEmptyInputPopup();
            }else{
                const newTask = new ToDoTask(inputBox.value);
                toDoTasks.push(newTask);
                const index = toDoTasks.indexOf(newTask);
                newTask.createId(index);
                Display.displayTask(index, newTask);        
            }
        }
        static displayTask(index, newTask){
            let displayTask =  `
                <div class="to-do-task-box" id="${index}">
                    <div class="to-do-task">${newTask.task}</div>
                    <button class="to-do-btn-done"><i class="fa-solid fa-check"></i></button>
                    <button class="to-do-btn-delete"><i class="fa-solid fa-trash"></i></button>
                </div>
                `;
            toDoContainer.innerHTML += displayTask;
            inputBox.value = "";
            inputBox.focus();
        }
        static deleteTask(idToDelete){ 
            const toDelete = document.getElementById(`${idToDelete}`);
            toDelete.remove();
        }
        static doneTask(idToDone){
            const toDoneParent = document.getElementById(`${idToDone}`);
            const ToDone = toDoneParent.querySelector('.to-do-task');
            console.log(ToDone);
            if(!ToDone.querySelector('s')){
                ToDone.innerHTML = `<s><em>${ToDone.textContent}</em></s>`;
            }else{
                ToDone.innerHTML = `${ToDone.textContent}`;
            }
        
        }
    }


    //------- Events Listener -------//

    //Add task to do and display it
    addBtn.addEventListener('click', (e)=> {
        e.preventDefault();
        Display.addTask();       
    });
   
    // Delete task to do
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-delete')){
            const taskBox = e.target.parentElement;
            const idToDelete = taskBox.id;
            Display.deleteTask(idToDelete);
        }
    });

    // Done/undone to do task
    toDoContainer.addEventListener('click', (e)=>{
        if(e.target.classList.contains('to-do-btn-done')){
            const taskBox = e.target.parentElement;
            const idToDone = taskBox.id;
            Display.doneTask(idToDone);
        }
    });

    // Closing popup that says input to do was empty
    document.addEventListener('click', (e)=>{
        if(e.target.classList.contains('empty-input-close-btn')){
            closeEmptyInputPopup();
        };
    });



    //------- Speech Recognition js -------/

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    
    const speechBtn = document.querySelector(".to-do-speech-btn");
    

    recognition.addEventListener('result', e =>{
        const transcript = Array.from(e.results)
            .map(results => results[0])
            .map(results => results.transcript)
            .join('');
        inputBox.value = transcript;
        
    });
    recognition.addEventListener('end', () =>{
        Display.addTask();
        speechBtn.classList.remove("rec");
    })

    speechBtn.addEventListener('click', function(e) {
        e.preventDefault();
        speechBtn.classList.add("rec")
        recognition.start();
    })
    
});