
interact('.resizable')
    .resizable({
        edges: { top: true, left: true, bottom: true, right: true },
        listeners: {
            move: function (event) {
                let { x, y } = event.target.dataset

                x = (parseFloat(x) || 0) + event.deltaRect.left
                y = (parseFloat(y) || 0) + event.deltaRect.top

                Object.assign(event.target.style, {
                    width: `${event.rect.width}px`,
                    height: `${event.rect.height}px`,
                    transform: `translate(${x}px, ${y}px)`
                })

                Object.assign(event.target.dataset, { x, y })
            }
        }
    })

/* rotate */
/* 
 * Some code borrowed from: https://codepen.io/taye/pen/wrrxKb
*/

interact('.rotation-handle')
    .draggable({
        onstart: function (event) {
            var box = event.target.parentElement;
            var rect = box.getBoundingClientRect();

            // store the center as the element has css `transform-origin: center center`
            box.setAttribute('data-center-x', rect.left + rect.width / 2);
            box.setAttribute('data-center-y', rect.top + rect.height / 2);
            // get the angle of the element when the drag starts
            box.setAttribute('data-angle', getDragAngle(event));
        },
        onmove: function (event) {
            var box = event.target.parentElement;

            var pos = {
                x: parseFloat(box.getAttribute('data-x')) || 0,
                y: parseFloat(box.getAttribute('data-y')) || 0
            };

            var angle = getDragAngle(event);

            // update transform style on dragmove
            box.style.transform = 'translate(' + pos.x + 'px, ' + pos.y + 'px) rotate(' + angle + 'rad' + ')';
        },
        onend: function (event) {
            var box = event.target.parentElement;

            // save the angle on dragend
            box.setAttribute('data-angle', getDragAngle(event));
        },
    })

function getDragAngle(event) {
    var box = event.target.parentElement;
    var startAngle = parseFloat(box.getAttribute('data-angle')) || 0;
    var center = {
        x: parseFloat(box.getAttribute('data-center-x')) || 0,
        y: parseFloat(box.getAttribute('data-center-y')) || 0
    };
    var angle = Math.atan2(center.y - event.clientY,
        center.x - event.clientX);

    return angle - startAngle;
}

// var element = $("#imageDIV"); 
// var getCanvas; 

// function captureImage() {
//     html2canvas(element[0], {
//         onrendered: function (canvas) {
//             $("#previewImage").empty().append(canvas);
//             getCanvas = canvas;
//         }
//     });
// }

// // $(document).ready(function () {
// //     captureImage(); 
// // });

// $("#download").on('click', function () {
//     captureImage(); 

//     setTimeout(function() { 
//         var imageData = getCanvas.toDataURL("image/png");
//         var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
//         $("#final").attr("download", "image.png").attr("href", newData)[0].click();
//     }, 1000); 
// });

function downloadImage() {
    var container = document.getElementById('imageDIV');
    html2canvas(container).then(function (canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'rotated-image.png';
        link.click();
    });
}

document.getElementById('download').addEventListener('click', downloadImage);