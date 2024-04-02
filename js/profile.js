document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('profileForm');

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const duckSelect = document.getElementById('duck');

    // Load data from localStorage if available
    const userProfileString = localStorage.getItem('userProfile');
    console.log(userProfileString);
    if (userProfileString) {
        const userProfile = JSON.parse(userProfileString);

        nameInput.value = userProfile.name || '';
        phoneInput.value = userProfile.phone || '';
        duckSelect.value = userProfile.duck || '';
    }

    // Save new values when submitting the form
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const phone = phoneInput.value;
        const duck = duckSelect.value;

        if (duck !== 'darkwing') {
            alert('Please select the correct Best Fictional Duck.');
            return;
        }

        const userProfile = {
            name: name,
            phone: phone,
            duck: duck
        };

        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert('Profile saved successfully!');
    });
});