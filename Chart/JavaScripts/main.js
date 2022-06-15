const canvasHeight = window.innerHeight;
const canvasWidth = parseInt(window.innerWidth * .95);

var chartContainer = document.getElementById('chartContainer');

addCandle(chartContainer, { canvasHeight: canvasHeight, open: 10, high: 1, low: 40, close: 35});

