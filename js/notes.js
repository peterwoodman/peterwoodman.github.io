
import { saveData } from './storage.js';

var activeNotes = null;

var notesList = null;

export function noteCount() {
    return activeNotes.length;
}

function setNotes(notes) {
    activeNotes = notes;
}

function focusLastTextarea() {
    const textareas = document.querySelectorAll('.note-text');
    if (textareas.length > 0) {
        const lastTextarea = textareas[textareas.length - 1];
        lastTextarea.focus();
    }
}

function autoResizeHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function addDisplayNote(note, noteIndex) {
    // Create a list item for the note
    const li = document.createElement('li');
    li.classList.add('note-item');

    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container-div');

    // Create an editable textarea for the note content
    const textarea = document.createElement('textarea');
    textarea.value = note.content;
    textarea.placeholder = 'Enter your note here';
    textarea.addEventListener('input', () => {
        activeNotes[noteIndex].content = textarea.value;
        saveData();
        autoResizeHeight(textarea);
    });
    setTimeout(function () {
        autoResizeHeight(textarea);
    }, 0);

    // Create a delete button for the note
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => {
        activeNotes.splice(noteIndex, 1);
        saveData();
        li.remove();
    });
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('svg-icon');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', './images/delete.svg#icon');
    svg.appendChild(use);
    deleteButton.appendChild(svg);

    containerDiv.appendChild(textarea);
    containerDiv.appendChild(deleteButton);

    li.appendChild(containerDiv);
    notesList.appendChild(li);
}


export function displayNotes(notes) {

    console.log(notes);

    setNotes(notes);

    notesList = document.getElementById('noteList');
    notesList.innerHTML = '';

    console.log(activeNotes);
    activeNotes.forEach((note, noteIndex) => {
        addDisplayNote(note, noteIndex);
    });

    focusLastTextarea();
}

document.addEventListener('DOMContentLoaded', function () {

    const addNoteButton = document.getElementById('addNoteButton');
    addNoteButton.addEventListener('click', () => {
        activeNotes.push({ content: '' });
        addDisplayNote(activeNotes[activeNotes.length - 1], activeNotes.length - 1);
    });


});

