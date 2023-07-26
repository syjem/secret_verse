import windowLocationNavigator from "./imports.js";

const logoutLink = document.getElementById("signout");
const settingsLink = document.getElementById("settings");

settingsLink.addEventListener("click", () => {
    windowLocationNavigator("/user/profile/edit");
});

logoutLink.addEventListener("click", () => {
    windowLocationNavigator("/logout");
});


const profileImageContainer = document.querySelector(
    ".profile-image-container"
);

const profileSettings = document.querySelector(".profile-settings");
const listItem = document.querySelectorAll(".profile-nav-list-item");

listItem.forEach((item) => {
item.addEventListener("click", function() {
    this.classList.add("active");

    listItem.forEach((otherItem) => {
        if (otherItem !== this) {
            otherItem.classList.remove("active");
        }
    });
});
});
