document.addEventListener("DOMContentLoaded", () => {
  // Active class on sidebar
  const navListItem = document.querySelectorAll(".nav-list-item");

  navListItem.forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.add("active");

      navListItem.forEach((otherItem) => {
        if (otherItem !== this) {
          otherItem.classList.remove("active");
        }
      });
    });
  });

  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const search = document.getElementById("search").value;

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      });

      if (!response.ok) {
        throw new Error("Request failed. Please try again later.");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  });
});
