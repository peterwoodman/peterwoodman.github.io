
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

var path = [];

const savedText = localStorage.getItem('autosave_text');

function selectCategory(index, category) {

    // Display notes:


    // Update sidebar:
    path.push(index);

    renderCategory(category);
}

function createCategoryListItem(index, category) {
    const li = document.createElement('li');
    li.classList.add('category');
    li.textContent = category.name;
    li.style.color = category.color;
    categoriesList.appendChild(li);
    li.addEventListener('click', () => selectCategory(index, category));
}

function clearCategoryList() {
    categoriesList.innerHTML = '';
}

function renderCategory(category) {
    const childCategories = category.children || [];
    categoriesHeader.textContent = category.name;
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

    // Reset the categories list to render the parent categories
    renderCategory(getParentFromPath());
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

    // If there's a saved value, set the input value to it
    if (savedText) {
        document.getElementById('textInput').value = savedText;
    }

    // Add an event listener to the input to save its value to localStorage on change
    document.getElementById('textInput').addEventListener('input', function () {
        localStorage.setItem('autosave_text', this.value);
    });

    selectCategory(0, categories);

    backButton.addEventListener('click', () => {
        goBack();
    });

});

