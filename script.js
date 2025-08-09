document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const imageContainer = document.getElementById('image-container');
    const carDiagram = document.getElementById('car-diagram');
    const undoButton = document.getElementById('undo-mark-button');
    const captureButton = document.getElementById('capture-button');
    const capturedImageContainer = document.getElementById('captured-image-container');
    const capturedImage = document.getElementById('captured-image');
    const downloadLink = document.getElementById('download-link');
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
        html2canvas(document.getElementById('capture-area')).then(canvas => {
            const imageURL = canvas.toDataURL('image/png');
            capturedImage.src = imageURL;
            downloadLink.href = imageURL;
            capturedImageContainer.style.display = 'block';
        });
    });
});