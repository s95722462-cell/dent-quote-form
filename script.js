document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quote-form');
    const imageContainer = document.getElementById('image-container');
    const carDiagram = document.getElementById('car-diagram');
    const undoButton = document.getElementById('undo-mark-button');
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
        markers.push({ element: marker, x, y }); // 마커 요소와 좌표를 함께 저장
    });

    undoButton.addEventListener('click', () => {
        if (markers.length > 0) {
            const lastMarker = markers.pop(); // 마지막 마커 제거
            imageContainer.removeChild(lastMarker.element);
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const carBrand = document.getElementById('car-brand').value;
        const carModel = document.getElementById('car-model').value;
        const carColor = document.getElementById('car-color').value;

        let emailBody = `차량 브랜드: ${carBrand}\n`;
        emailBody += `차량 이름: ${carModel}\n`;
        emailBody += `차량 색상: ${carColor}\n\n`;
        emailBody += '덴트 부위 (좌표):\n';

        markers.forEach((marker, index) => {
            emailBody += `  - 위치 ${index + 1}: x=${marker.x.toFixed(2)}, y=${marker.y.toFixed(2)}\n`;
        });

        window.location.href = `mailto:kdx0756@naver.com?subject=덴트 견적 문의&body=${encodeURIComponent(emailBody)}`;
    });
});
