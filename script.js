document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const imageContainer = document.getElementById('image-container');
    const carDiagram = document.getElementById('car-diagram');
    const undoButton = document.getElementById('undo-mark-button');
    const captureButton = document.getElementById('capture-button');
    const capturedImageContainer = document.getElementById('captured-image-container');
    const capturedImage = document.getElementById('captured-image');
    const markers = [];

    // --- Real-time Sync Logic ---
    const inputs = form.querySelectorAll('.input-wrapper input[type="text"]');
    inputs.forEach(input => {
        const displayId = input.id + '-display';
        const displayDiv = document.getElementById(displayId);
        if (displayDiv) {
            if (input.placeholder) {
                displayDiv.innerText = input.placeholder;
                displayDiv.style.color = '#aaa';
            }

            input.addEventListener('input', () => {
                if (input.value) {
                    displayDiv.innerText = input.value;
                    displayDiv.style.color = '#333';
                } else {
                    displayDiv.innerText = input.placeholder;
                    displayDiv.style.color = '#aaa';
                }
            });
        }
    });

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
        inputs.forEach(input => input.style.visibility = 'hidden');
        html2canvas(document.getElementById('quote-container'), {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imageURL = canvas.toDataURL('image/png');
            capturedImage.src = imageURL;
            capturedImageContainer.style.display = 'block';
            inputs.forEach(input => input.style.visibility = 'visible');
        });
    });
});