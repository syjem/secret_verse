document.addEventListener("DOMContentLoaded", () => {
    // Alert btn-close

    const alertContainer = document.querySelector(".alert-container");

    alertContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-close") || e.target.closest(".btn-close")) {
            const alertBtnClose = e.target.closest(".btn-close");
            const alertContainer = alertBtnClose.parentElement;
            alertContainer.classList.add("fade");

            setTimeout(() => {
                alertContainer.style.display = "none";
                alertContainer.classList.remove("show", "fade");
            }, 500);
        }
    });
});