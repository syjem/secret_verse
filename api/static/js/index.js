import windowLocationNavigator from "./imports.js";

// Generate url_for
const logoutLink = document.getElementById("signout");
const settingsLink = document.getElementById("settings");
const uploadStory = document.getElementById("upload-story");
const secretsFeed = document.getElementById("secrets-feed");
const myCollections = document.getElementById("my-collections");
const dashboard = document.getElementById("dashboard");

logoutLink.addEventListener("click", () => {
    windowLocationNavigator("/logout");
});

dashboard.addEventListener("click", () => {
    windowLocationNavigator("/library");
});

settingsLink.addEventListener("click", () => {
    windowLocationNavigator("/user/profile/edit");
});

uploadStory.addEventListener("click", () => {
    windowLocationNavigator("/library/upload-story");
});

secretsFeed.addEventListener("click", () => {
    windowLocationNavigator("/library/secrets-feed");
});

myCollections.addEventListener("click", () => {
    windowLocationNavigator("/library/my-collections");
});
