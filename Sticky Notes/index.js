const textarea = document.getElementById('textarea');
const color = document.getElementById('color');
const addNoteBtn = document.getElementById('add-note-btn');

addNoteBtn.addEventListener('click', () => {

    const noteTag = document.getElementById('textarea');
    let note = noteTag.value;

    const color = document.getElementById('color').value;

    note = note.trim();

    if(note.length == 0){
        alert('Note cannot be empty!');
        return;
    }

    const noteContainer = document.querySelector('.notes-container');

   
    const noteElement = document.createElement('div');
    const btnContainer = document.createElement('div');
    
    noteElement.classList.add('note-element');
    noteElement.style.backgroundColor = color;

    btnContainer.classList.add('btn-container');

    let description = document.createElement('p');
    let editTextarea = document.createElement('textarea');

    description.textContent = note;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'x';
    deleteBtn.classList.add('note-btn', 'x-btn');

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.classList.add('note-btn', 'edit-btn');

    deleteBtn.addEventListener('click', () => {
        noteContainer.removeChild(noteElement);
    });

    editBtn.addEventListener('click', () => {

        if(editBtn.innerText === 'Edit'){
            editBtn.innerText = 'Save';
            editTextarea.value = description.textContent;
            noteElement.replaceChild(editTextarea, description);
        }
        else{
            editBtn.innerText = 'Edit';
            description.textContent = editTextarea.value;
            noteElement.replaceChild(description, editTextarea);
        }
    });

    btnContainer.appendChild(deleteBtn);
    btnContainer.appendChild(editBtn);
    noteElement.appendChild(btnContainer);
    noteElement.appendChild(description);
    
    noteContainer.appendChild(noteElement);

    noteTag.value = "";
});