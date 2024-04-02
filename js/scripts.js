function showContent(id) {
    // Hide all content divs
    var contentDivs = document.querySelectorAll('.content');
    contentDivs.forEach(function (div) {
        div.style.display = 'none';
    });

    // Show the selected content div
    var selectedDiv = document.getElementById(id);
    if (selectedDiv) {
        selectedDiv.style.display = 'block';
    }
}