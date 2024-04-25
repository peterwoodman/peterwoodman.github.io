
import { displayNotes, noteCount } from './notes.js';
import { saveData, data } from './storage.js';

var addCategoryButton = null;
var categoriesHeader = null;
var categoriesList = null;
var backButton = null;
export var selectedCategory = null;
var path = [];

function selectCategory(category) {
    selectedCategory = category;
    if (!Array.isArray(selectedCategory.notes)) {
        selectedCategory.notes = [];
    }
    displayNotes(selectedCategory.notes);
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

    path.pop();
    selectCategory(getParentFromPath());
}

function getParentFromPath() {
    let parent = data;
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
        selectedCategory.children.push({ name: newCategoryName });
        renderCategory();
        saveData();
    }
}

function rename() {
    const newName = prompt('Edit the category name here. Enter "delete" to remove it.', selectedCategory.name);
    if (newName === null) return;
    if (newName === 'delete') {
        deleteCategory();
    }
    else if (newName !== '') {
        console.log(newName);
        selectedCategory.name = newName;
        renderCategory();
        saveData();
    }
}

function deleteCategory() {
    if (path.length === 1) {
        // Show error: cannot delete root category
        return;
    }
    if (noteCount() > 0) {
        // Show error: cannot delete category with notes
        return;
    }

    const index = path[path.length - 1];

    goBack();
    selectedCategory.children.splice(index, 1);
    saveData();
    renderCategory();
}

document.addEventListener('DOMContentLoaded', function () {
    categoriesList = document.getElementById('categories');
    backButton = document.getElementById('backButton');
    categoriesHeader = document.getElementById('categoriesHeader');
    addCategoryButton = document.getElementById('addCategoryButton');

    path.push(0);
    selectCategory(data);

    addCategoryButton.addEventListener('click', () => {
        addCategory();
    });

    backButton.addEventListener('click', () => {
        goBack();
    });

    categoriesHeader.addEventListener('click', () => {
        rename();
    });

});