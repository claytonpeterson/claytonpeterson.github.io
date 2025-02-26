// Loads the nav bar
document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("navbar-placeholder").innerHTML = data;
    }
)});

// Loads the footer
document.addEventListener("DOMContentLoaded", function() {
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer-placeholder").innerHTML = data;
    }
)});
