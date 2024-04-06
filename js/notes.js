
document.addEventListener('DOMContentLoaded', function () {
    const savedText = localStorage.getItem('autosave_text');

    // If there's a saved value, set the input value to it
    if (savedText) {
        document.getElementById('textInput').value = savedText;
    }

    // Add an event listener to the input to save its value to localStorage on change
    document.getElementById('textInput').addEventListener('input', function () {
        localStorage.setItem('autosave_text', this.value);
    });
});

