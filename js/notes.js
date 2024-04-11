
import { selectedCategory } from './categories.js';


var activeNotes = [];

var colorBar = null;


function saveNotes() {
    localStorage.setItem(`notes_${selectedCategory.name}`, JSON.stringify(activeNotes));
}

export function loadNotes() {
    activeNotes = JSON.parse(localStorage.getItem(`notes_${selectedCategory.name}`)) || [];
}

function focusLastTextarea() {
    const textareas = document.querySelectorAll('.note-text');
    if (textareas.length > 0) {
        const lastTextarea = textareas[textareas.length - 1];
        lastTextarea.focus();
    }
}

export function displayNotes() {

    const notesList = document.getElementById('noteList');
    notesList.innerHTML = '';

    if (!colorBar) colorBar = document.getElementById('colorBar');
    colorBar.className = selectedCategory.color;

    activeNotes.forEach((note, noteIndex) => {
        // Create a list item for the note
        const li = document.createElement('li');
        li.classList.add('note-item');

        // Create an editable textarea for the note content
        const textarea = document.createElement('textarea');
        textarea.value = note.content;
        textarea.placeholder = 'Enter your note here';
        textarea.addEventListener('input', () => {
            activeNotes[noteIndex].content = textarea.value;
            saveNotes();
        });

        // Create a delete button for the note
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            activeNotes.splice(noteIndex, 1);
            saveNotes();
            li.remove();
        });
        const imageDelete = document.createElement('img');
        imageDelete.src = 'images/delete.svg';
        imageDelete.alt = 'Delete note';
        imageDelete.width = 24;
        imageDelete.height = 24;
        deleteButton.appendChild(imageDelete);

        li.appendChild(textarea);
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });

    focusLastTextarea();
}

document.addEventListener('DOMContentLoaded', function () {

    const addNoteButton = document.getElementById('addNoteButton');
    addNoteButton.addEventListener('click', () => {
        activeNotes.push({ content: '' });
        saveNotes();
        displayNotes();
    });


});

