// Show Profile pop-over
const profileImage = document.querySelector(".user-image");
const profilePopOver = document.querySelector(".pop-over");

profileImage.addEventListener("click", (e) => {
    profilePopOver.classList.add("fade");

    if (profilePopOver.classList.contains("fade")) {
        setTimeout(() => {
            profileImage.style.outline = "2px solid var(--clr-accent)";
        }, 300);
    }

    setTimeout(() => {
        profilePopOver.classList.toggle("show");
        profilePopOver.classList.remove("fade");
    }, 300);
});

profilePopOver.addEventListener("transitionend", () => {
    if (!profilePopOver.classList.contains("fade")) {
        profileImage.style.outline = "none";
    }
});

// Close pop-over when clicking anywhere (excluding both the pop-over itself and the profileImage)
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target !== profilePopOver && target !== profileImage && !profilePopOver.contains(target)) {
        profilePopOver.classList.remove("show");
        profilePopOver.classList.remove("fade");
        profileImage.style.outline = "none";
    }
});
