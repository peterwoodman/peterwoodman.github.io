
import { loadNotes, displayNotes } from './notes.js';

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

var categories = null;
loadCategories();

var addCategoryButton = null;
var categoriesHeader = null;
var categoriesList = null;
var backButton = null;

export var selectedCategory = null;

var path = [];

function loadCategories() {
    categories = JSON.parse(localStorage.getItem('categories')) || defaultCategories;
}

function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
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
    if (path.length > 1) {
        backButton.style.display = 'block';
    } else {
        backButton.style.display = 'none';
    }

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

function addCategory() {
    const newCategoryName = prompt('Enter the name of the new category');
    if (newCategoryName !== '') {
        if (!Array.isArray(selectedCategory.children)) {
            selectedCategory.children = [];
        }
        selectedCategory.children.push({ name: newCategoryName, color: 'blue' });
        renderCategory();
        saveCategories();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    categoriesList = document.getElementById('categories');
    backButton = document.getElementById('backButton');
    categoriesHeader = document.getElementById('categoriesHeader');
    addCategoryButton = document.getElementById('addCategoryButton');

    path.push(0);
    selectCategory(categories);

    addCategoryButton.addEventListener('click', () => {
        addCategory();
    });

    backButton.addEventListener('click', () => {
        goBack();
    });


});