document.addEventListener('DOMContentLoaded', function () {
    const image = document.getElementById('image');
    const rotateIcon = document.getElementById('rotate-icon');
    let isDragging = false;
    let initialX, initialY, currentRotation = 0;

    rotateIcon.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX;
        initialY = e.clientY;
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            image.style.transform = `rotate(${currentRotation + angle}deg)`;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            currentRotation += angle;
            isDragging = false;
        }
    });
});
