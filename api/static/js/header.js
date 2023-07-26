document.addEventListener("DOMContentLoaded", () => {
    // Header styles on scroll
    const header = document.querySelector("header");

    const setHeaderStyle = () => {
        header.style.background = "var(--background-gradient)";
        header.style.boxShadow = "0 1px 10px var(--clr-primary)";
    };

    const initialHeaderStyle = () => {
        header.style.background = "transparent";
        header.style.boxShadow = "none";
    };

    const showSlide = (element) => {
        element.style.height = element.scrollHeight + "px";
    };

    window.addEventListener("scroll", () => {
        window.scrollY > 0 ? setHeaderStyle() : initialHeaderStyle();
    });

    // For Navbar Toggle Menu
    const toggleMenu = document.querySelector(".toggle-menu");
    const navbar = document.querySelector(".nav-menu");
    const bar1 = document.querySelector(".first-bar");
    const bar2 = document.querySelector(".second-bar");
    const bar3 = document.querySelector(".third-bar");

    toggleMenu.addEventListener("click", () => {
        navbar.classList.toggle("active-navbar");
        bar1.classList.toggle("rotate");
        bar2.classList.toggle("rotate");
        bar3.classList.toggle("close");

        navbar.classList.contains("active-navbar") ?
            showSlide(navbar) :
            (navbar.style.height = 0);
    });
});