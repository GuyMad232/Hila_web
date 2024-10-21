function includeHTML() {
    var elements = document.querySelectorAll('[data-include]');
    elements.forEach(function (element) {
        var file = element.getAttribute('data-include');
        if (file) {
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch ' + file);
                    }
                    return response.text();
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute('data-include');
                    executeScripts(element); // Execute scripts in the included HTML
                })
                .catch(error => console.error('Error loading HTML component:', error));
        }
    });
}

function executeScripts(container) {
    var scripts = container.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script");
        if (scripts[i].src) {
            // Avoid adding duplicate scripts
            if (!document.querySelector(`script[src="${scripts[i].src}"]`)) {
                script.src = scripts[i].src;
                document.body.appendChild(script);
            }
        } else {
            script.textContent = scripts[i].textContent;
            document.body.appendChild(script);
        }
    }
}

document.addEventListener('DOMContentLoaded', includeHTML);
