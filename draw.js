const imagePath = 'image/photocard.png';

const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');

const image = new Image();
image.src = imagePath;
image.onload = function () {
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
};

const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#000000';
const CANVAS_SIZE1 = 800;
const CANVAS_SIZE2 = 400;

ctx.strokeStyle = '#2c2c2c';
ctx.fillStyle = 'white';

canvas.width = CANVAS_SIZE1;
canvas.height = CANVAS_SIZE2;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

let undoHistory = [];

function stopPainting() {
  painting = false;
  undoHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function startPainting() {
  painting = true;
  undoHistory.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undoDrawing() {
  if (undoHistory.length > 1) {
    undoHistory.pop();
    context.putImageData(undoHistory[undoHistory.length - 1], 0, 0);
  } else {
    clearCanvas();
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  undoHistory = [];
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    if (!filling) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleSaveClick() {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'faceImage';
  link.click();
}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'z') {
    undoDrawing();
  }
});

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
);

if (range) {
  range.addEventListener('input', handleRangeChange);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}
