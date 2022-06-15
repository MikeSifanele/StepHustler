function addCandle(chart, { canvasHeight = 0, wickWidth = 2, open = 0, high = 0, low = 0, close = 0, isPeak = false, isValley = false } = {}) {
    const numberOfCandles = chart.getElementsByTagName('canvas').length;

    if (numberOfCandles >= 240) {
        document.getElementById("candle_0").remove();
    }

    open = fromPercentage(open, canvasHeight);
    high = fromPercentage(high, canvasHeight);
    low = fromPercentage(low, canvasHeight);
    close = fromPercentage(close, canvasHeight);

    var bodyWidth = wickWidth * 3;

    const elementId = 'candle_' + numberOfCandles.toString();

    let canvas = document.createElement('canvas');
    canvas.id = elementId;
    canvas.height = canvasHeight;
    canvas.width = bodyWidth + wickWidth;

    chart.appendChild(canvas);

    var bodyLeftBorder = 1;
    var wickLeftBorder = bodyLeftBorder + wickWidth;
    var bodyRightBorder = bodyLeftBorder + bodyWidth;
    var wickRightBorder = wickLeftBorder + wickWidth;

    var ctx = canvas.getContext('2d');

    ctx.fillStyle = (close >= open) ? '#00e600' : '#ff0000';
    ctx.beginPath();

    //upper wick top left corner
    ctx.moveTo(wickLeftBorder, high);
    //upper wick bottom left corner
    ctx.lineTo(wickLeftBorder, Math.max(open, close));
    //upper body left corner
    ctx.lineTo(bodyLeftBorder, Math.max(open, close));
    //lower body left corner
    ctx.lineTo(bodyLeftBorder, Math.min(open, close));
    //lower wick top left corner
    ctx.lineTo(wickLeftBorder, Math.min(open, close));
    //lower wick bottom left corner
    ctx.lineTo(wickLeftBorder, low);
    //lower wick bottom right corner
    ctx.lineTo(wickRightBorder, low);
    //lower wick top right corner
    ctx.lineTo(wickRightBorder, Math.min(open, close));
    //lower body right corner
    ctx.lineTo(bodyRightBorder, Math.min(open, close));
    //upper body right corner
    ctx.lineTo(bodyRightBorder, Math.max(open, close));
    //upper wick bottom right corner
    ctx.lineTo(wickRightBorder, Math.max(open, close));
    //upper wick top right corner
    ctx.lineTo(wickRightBorder, high);

    ctx.closePath();
    ctx.fill();
}
function fromPercentage(value, maxValue) {
    return value / 100 * maxValue;
}