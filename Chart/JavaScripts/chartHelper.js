function addCandle(chart, candleIndex, { canvasHeight = 0, wickWidth = 2, open = 0, high = 0, low = 0, close = 0, isPeak = false, isValley = false, isBigMove = false } = {}) {
    if (candleIndex >= 239) {
        document.getElementById("candle_0").remove();
    }

    open = fromPercentage(open, canvasHeight);
    high = fromPercentage(high, canvasHeight);
    low = fromPercentage(low, canvasHeight);
    close = fromPercentage(close, canvasHeight);

    var bodyWidth = wickWidth * 3;

    var bodyLeftBorder = 1;
    var wickLeftBorder = bodyLeftBorder + wickWidth;
    var bodyRightBorder = bodyLeftBorder + bodyWidth;
    var wickRightBorder = wickLeftBorder + wickWidth;

    const elementId = 'candle_' + candleIndex;

    let canvas = document.createElement('canvas');
    canvas.id = elementId;
    chart.appendChild(canvas);

    canvas.height = Math.ceil(low - high);
    canvas.width = bodyWidth + wickWidth;
    canvas.style = 'position:absolute; top:' + (high + 14) + 'px; left:' + (document.getElementById('candle_0').getBoundingClientRect().left * (candleIndex + 1)) + 'px;';

    var ctx = canvas.getContext('2d');
    ctx.fillStyle = (close >= open) ? '#00e600' : '#ff0000';
    ctx.beginPath();

    //upper wick top left corner
    ctx.moveTo(wickLeftBorder, 0);
    //upper wick bottom left corner
    ctx.lineTo(wickLeftBorder, calculateRelativeVal(high, Math.max(open, close)));
    //upper body left corner
    ctx.lineTo(bodyLeftBorder, calculateRelativeVal(high, Math.max(open, close)));
    //lower body left corner
    ctx.lineTo(bodyLeftBorder, calculateRelativeVal(high, Math.min(open, close)));
    //lower wick top left corner
    ctx.lineTo(wickLeftBorder, calculateRelativeVal(high, Math.min(open, close)));
    //lower wick bottom left corner
    ctx.lineTo(wickLeftBorder, calculateRelativeVal(high, low));
    //lower wick bottom right corner
    ctx.lineTo(wickRightBorder, calculateRelativeVal(high, low));
    //lower wick top right corner
    ctx.lineTo(wickRightBorder, calculateRelativeVal(high, Math.min(open, close)));
    //lower body right corner
    ctx.lineTo(bodyRightBorder, calculateRelativeVal(high, Math.min(open, close)));
    //upper body right corner
    ctx.lineTo(bodyRightBorder, calculateRelativeVal(high, Math.max(open, close)));
    //upper wick bottom right corner
    ctx.lineTo(wickRightBorder, calculateRelativeVal(high, Math.max(open, close)));
    //upper wick top right corner
    ctx.lineTo(wickRightBorder, 0);

    ctx.closePath();
    ctx.fill();

    if (isPeak) {
        plotPivot({ elementId: elementId, isPeak: true, isBigMove: isBigMove });
    }
    else if (isValley) {
        plotPivot({ elementId: elementId, isBigMove: isBigMove });
    }
}
function plotPivot({ elementId = '', isPeak = false, isBigMove = false }) {
    const color = isPeak ? '#00e600' : '#ff0000';

    let candle = document.getElementById(elementId);

    const y = (isPeak ? candle.getBoundingClientRect().top - 13 : candle.getBoundingClientRect().bottom - 3);

    let canvas = document.createElement('canvas');
    canvas.id = elementId + '_p';
    canvas.width = 10;
    canvas.height = 16;
    canvas.style = 'position:absolute; top:' + y + 'px; left:' + (document.getElementById(elementId).getBoundingClientRect().left - 1) + 'px; z-index:1;';

    let ctx = canvas.getContext('2d');

    if (isBigMove) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.arc(5, 8, 6, isPeak ? 4 : 0.9, isPeak ? 5.4 : 2.3);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(5, 8, 3, 0, 2 * Math.PI);
    ctx.fill();

    document.getElementById('chartContainer').appendChild(canvas);
}
function fromPercentage(value, maxValue) {
    return value / 100 * maxValue;
}
function calculateRelativeVal(value1, value2) {
    return Math.abs(value1 - value2);
}