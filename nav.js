document.addEventListener("DOMContentLoaded", function () {
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("nav-placeholder").innerHTML = data;

            let currentPage = window.location.pathname.split("/").pop();
            let navLinks = document.querySelectorAll("#nav-placeholder .sidebar nav ul li a");

            navLinks.forEach(link => {
                if (link.getAttribute("href") === currentPage) {
                    link.classList.add("active");
                }
            });
        })
        .catch(error => console.error("Error loading navigation:", error));
});
