function includeHTML() {
    var elements = document.querySelectorAll('[data-include]');
    elements.forEach(function (element) {
        var file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
                element.removeAttribute('data-include');
                // Reapply styles after content is loaded
                setTimeout(function () {
                    element.style.width = '100%'; // Ensure the container takes full width
                }, 50);
            })
            .catch(error => console.error('Error loading HTML component:', error));
    });
}


function executeScripts(container) {
    var scripts = container.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script");
        if (scripts[i].src) {
            script.src = scripts[i].src;
        } else {
            script.textContent = scripts[i].textContent;
        }
        document.body.appendChild(script);
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);
