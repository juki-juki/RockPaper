document.addEventListener("DOMContentLoaded", function () {
    const changeNameModal = new bootstrap.Modal(document.getElementById('changeNameModal'));
    const newUserNameInput = document.getElementById('newUserName');
    const playerTitle = document.getElementById('player-title');

    changeNameModal.show();

    document.getElementById('saveUserName').addEventListener('click', function () {
        const newName = newUserNameInput.value;

        // Check if the user input is empty
        if (!newName.trim()) {
            playerTitle.textContent = "Lodi Cakes";
        } else {
            playerTitle.textContent = newName;
        }

        changeNameModal.hide();
    });
});

function updateUserProfile(newName) {
    console.log("New Name: " + newName);
}
