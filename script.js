document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const imageContainer = document.getElementById('image-container');
    const carDiagram = document.getElementById('car-diagram');
    const undoButton = document.getElementById('undo-mark-button');
    const captureButton = document.getElementById('capture-button');
    const capturedImageContainer = document.getElementById('captured-image-container');
    const capturedImage = document.getElementById('captured-image');
    const markers = [];

    imageContainer.addEventListener('click', (event) => {
        if (!carDiagram) return;

        const rect = carDiagram.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const marker = document.createElement('div');
        marker.classList.add('marker');
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;

        imageContainer.appendChild(marker);
        markers.push({ element: marker, x, y });
    });

    undoButton.addEventListener('click', () => {
        if (markers.length > 0) {
            const lastMarker = markers.pop();
            imageContainer.removeChild(lastMarker.element);
        }
    });

    captureButton.addEventListener('click', () => {
        const inputs = form.querySelectorAll('input[type="text"]');
        const replacements = [];

        // Replace inputs with divs for capture
        inputs.forEach(input => {
            const replacement = document.createElement('div');
            replacement.classList.add('input-replacement');
            replacement.innerText = input.value || ' ';
            replacement.style.display = 'flex'; // Use flex for centering
            input.style.display = 'none';
            input.parentNode.insertBefore(replacement, input.nextSibling);
            replacements.push({ original: input, replacement: replacement });
        });

        html2canvas(document.getElementById('quote-container')).then(canvas => {
            const imageURL = canvas.toDataURL('image/png');
            capturedImage.src = imageURL;
            capturedImageContainer.style.display = 'block';

            // Restore original inputs
            replacements.forEach(item => {
                item.original.style.display = 'block';
                item.replacement.parentNode.removeChild(item.replacement);
            });
        });
    });
});