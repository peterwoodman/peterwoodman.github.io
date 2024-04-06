
const defaultCategories =
{
    name: 'Unsorted', color: 'gray', children: [
        {
            name: 'Work', color: 'blue', children: [
                { name: 'Meetings', color: 'blue' },
                { name: 'Projects', color: 'blue' },
                { name: 'Tasks', color: 'blue' },
            ]
        },
        {
            name: 'Personal', color: 'green', children: [
                { name: 'Health', color: 'green' },
                { name: 'Finance', color: 'green' },
                { name: 'Hobbies', color: 'green' },
            ]
        }
    ]
}

var categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : defaultCategories;

var categoriesHeader = null;
var categoriesList = null;
var backButton = null;
var sidebar = null;
var categoryNotes = [];
var selectedCategory = null;

var path = [];

function saveNotes() {
    localStorage.setItem(`notes_${selectedCategory.name}`, JSON.stringify(categoryNotes));
}

function loadNotes() {
    categoryNotes = JSON.parse(localStorage.getItem(`notes_${selectedCategory.name}`)) || [];
}

function focusLastTextarea() {
    const textareas = document.querySelectorAll('.note-text');
    if (textareas.length > 0) {
        const lastTextarea = textareas[textareas.length - 1];
        lastTextarea.focus();
    }
}

function displayNotes() {

    const notesList = document.getElementById('noteList');
    notesList.innerHTML = '';

    console.log(categoryNotes);
    categoryNotes.forEach((note, noteIndex) => {
        // Create a list item for the note
        const li = document.createElement('li');
        li.classList.add('note-item');

        // Create an editable textarea for the note content
        const textarea = document.createElement('textarea');
        textarea.value = note.content;
        textarea.placeholder = 'Enter your note here';
        textarea.classList.add('note-text');
        textarea.addEventListener('input', () => {
            categoryNotes[noteIndex].content = textarea.value;
            saveNotes();
        });

        // Create a delete button for the note
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            categoryNotes.splice(noteIndex, 1);
            saveNotes();
            li.remove();
        });

        li.appendChild(textarea);
        li.appendChild(deleteButton);
        notesList.appendChild(li);
    });

    focusLastTextarea();
}


function selectCategory(category) {
    selectedCategory = category;
    loadNotes();
    displayNotes();
    renderCategory();
}

function createCategoryListItem(index, category) {
    const li = document.createElement('li');
    li.classList.add('category-item');
    li.textContent = category.name;
    li.classList.add(category.color);
    categoriesList.appendChild(li);
    li.addEventListener('click', () => {
        path.push(index);
        selectCategory(category)
    });
}

function clearCategoryList() {
    categoriesList.innerHTML = '';
}

function renderCategory() {
    const childCategories = selectedCategory.children || [];
    categoriesHeader.textContent = selectedCategory.name;
    clearCategoryList();
    childCategories.forEach((child, index) => {
        createCategoryListItem(index, child);
    });
}

function goBack() {
    if (path.length === 1) {
        return;
    }

    // Remove the last index from the path
    path.pop();

    console.log(path);

    // Reset the categories list to render the parent categories
    selectCategory(getParentFromPath());
}

function getParentFromPath() {
    let parent = categories;
    for (let i = 1; i < path.length; i++) {
        parent = parent.children[path[i]];
    }
    return parent;

}

function getParentCategories() {
    let parentCategories = categories.children;

    // Traverse the category tree using the path indices,
    // excluding the last index to get the parent categories
    for (let i = 1; i < path.length; i++) {
        parentCategories = parentCategories[path[i]].children || [];
    }

    return parentCategories;
}

document.addEventListener('DOMContentLoaded', function () {
    sidebar = document.getElementById('sidebar');
    categoriesList = document.getElementById('categories');
    backButton = document.getElementById('backButton');
    categoriesHeader = document.getElementById('categoriesHeader');

    path.push(0);
    selectCategory(categories);

    const addNoteButton = document.getElementById('addNoteButton');
    addNoteButton.addEventListener('click', () => {
        categoryNotes.push({ content: '' });
        saveNotes();
        displayNotes();
    });

    /*  // Add an event listener to the input to save its value to localStorage on change
      document.getElementById('textInput').addEventListener('input', function () {
          localStorage.setItem('autosave_text', this.value);
      });
  */


    backButton.addEventListener('click', () => {
        goBack();
    });

});

