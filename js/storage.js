
const defaultNotes =
{
    name: 'Quick Notes', notes: [
        { content: 'Welcome to Quick Notes!' }
    ], children: [
        { name: 'Meetings' },
        { name: 'Projects' },
        { name: 'Tasks' },
        {
            name: 'Personal', children: [
                { name: 'Health' },
                { name: 'Finance' },
                { name: '' },
            ]
        }
    ]
}

export var data = null;
loadData();

export function loadData() {
    data = JSON.parse(localStorage.getItem('notes')) || defaultNotes;
}

export function saveData() {
    localStorage.setItem('notes', JSON.stringify(data));
    console.log(data);
}

