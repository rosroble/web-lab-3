let x, y, r;
const X_VALUES = ['-4', '-3', '-2', '-1', '0', '1', '2', '3', '4'];
const R_VALUES = [2, 3, 4, 5];
let errorMessage = "";
const maxLength = 15;
let canvas;

canvas = $("#graph-canvas");


function onload() {
    drawCanvas();

    $(".h-input-r").on("change", function (event) {
        r = $(".h-input-r").val();
        if (!validateR()) {
            return;
        }
        drawCanvas()();
        redrawPoints();
    })

}

function redrawListener(data) {
    let status = data.status;
    if (status === "complete") {
        setTimeout(redrawPoints, 0);
    }
}
function redrawPoints() {
    const xTableValues = document.getElementsByClassName("x-table-value");
    const yTableValues = document.getElementsByClassName("y-table-value");
    const rTableValues = document.getElementsByClassName("r-table-value");
    const hitTableValues = document.getElementsByClassName("hit-table-value");

    for (let i = 0; i < xTableValues.length; i++) {
        if (parseFloat(rTableValues[i].innerHTML) === parseFloat(r)) {
            drawPointByRelativeCoordinates(xTableValues[i].innerHTML,
                yTableValues[i].innerHTML,
                hitTableValues[i].innerHTML);
        }
    }
}


function drawPoint(x, y, hit) {
    let ctxAxes = canvas[0].getContext('2d');
    ctxAxes.globalAlpha = 1;
    ctxAxes.save();
    ctxAxes.setLineDash([2, 2]);
    ctxAxes.beginPath();
    ctxAxes.moveTo(x, canvas.width() / 2);
    ctxAxes.lineTo(x, y);
    ctxAxes.moveTo(canvas.width() / 2, y);
    ctxAxes.lineTo(x, y);
    ctxAxes.stroke();
    ctxAxes.fillStyle = hit === "true" ? 'green' : 'red';
    ctxAxes.arc(x, y, 2, 0, 2 * Math.PI);
    ctxAxes.fill();
    ctxAxes.restore();
}

function drawPointByRelativeCoordinates(relX, relY, hit) {
    const gapPx = 300 / 11;
    let absoluteX = 150 + relX * gapPx;
    let absoluteY = 150 - relY * gapPx;
    drawPoint(absoluteX, absoluteY, hit);
}

canvas.on("click", function (event) {
    if (validateR()) {
        r = $(".h-input-r").val();
        const gapPx = 300 / 11;
        let offX = event.offsetX;
        let offY = event.offsetY;
        let xVal = ((offX - 150) / gapPx);
        let yVal = ((offY - 150) / -gapPx);
        $(".canvasX").attr("value", Math.ceil(xVal * 100) / 100).change();
        $(".canvasY").attr("value", Math.ceil(yVal * 100) / 100).change();
        $(".canvasR").attr("value", r).change();
        $(".hidden-submit-button").click();
    } else {
        alert("R not chosen.")
    }
})


function isNumber(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}

function addToErrorMessage(errorDesc) {
    errorMessage += (errorDesc + "\n");
}

function hasProperLength(input) {
    return input.length <= maxLength;
}

function validateX() {
    const selector = document.getElementById("XSelect");
    const selectedValue = selector.value;
    if (!(X_VALUES.includes(selectedValue))) {
        addToErrorMessage("HTML modified. Restart the page.");
        console.log("x");
        return false;
    }
    if (selectedValue === "") {
        addToErrorMessage("Нужно выбрать X");
        return false;
    }
    x = selectedValue;
    return true;
}

function validateY() {
    y = document.querySelector("input[id=yCoordinate]").value.replace(",", ".");
    if (y === undefined) {
        addToErrorMessage("Поле Y не заполнено");
        return false;
    }
    if (!isNumber(y)) {
        addToErrorMessage("Y должен быть числом от -3 до 3!");
        return false;
    }
    if (!hasProperLength(y)) {
        addToErrorMessage(`Длина числа должна быть не более ${maxLength} символов`);
        return false;
    }
    if (!((y > -3) && (y < 3))) {
        addToErrorMessage("Нарушена область допустимых значений Y (-3; 3)");
        return false;
    }
    return true;
}


function validateR() {
    if (!isNumber(r)) {
        return false;
    }
    return r >= 2 && r <= 5;

}

function submit() {
    if (validateX() & validateY() & validateR()) {
        sendCheckAreaRequest(x, y, r);
    }
    if (!(errorMessage === "")) {
        alert(errorMessage);
        errorMessage = "";
    }
}

function sendCheckAreaRequest(x, y, r) {
    return $.post("process", {
        'x': x,
        'y': y,
        'r': r
    }).done(function (result, status, xhr) {
        if (xhr.getResponseHeader('isValid') === "true") {
            $('#result-table tr:first').after(result);
            drawPointByRelativeCoordinates(x, y, r);
            return true;
        }
    })
}

// lab3 functions -------------------



function drawCanvas() {
    const ctx = canvas[0].getContext('2d');
    let canvasWidth = canvas[0].clientWidth;
    let canvasHeight = canvas[0].clientHeight;
    let labels = ["5", "4", "3", "2", "1", " ", "-1", "-2", "-3", "-4", "-5"];
    let xAxis = canvasWidth / 2;
    let yAxis = canvasHeight / 2;
    let xLabel = canvasWidth / 6;
    let yLabel = canvasHeight / 6;
    let offsetAxis = 7;
    let gapBetweenNotchesY = (canvasHeight) / (labels.length);
    let gapBetweenNotchesX = (canvasWidth) / (labels.length);


    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 1;
    drawAxes();
    designAxisX();
    designAxisY();

    function drawAxes() {
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.moveTo(xAxis, 0);
        ctx.lineTo(xAxis, canvasHeight);
        ctx.moveTo(0, yAxis);
        ctx.lineTo(canvasWidth, yAxis);
        ctx.stroke();
        ctx.closePath();
    }

    function designAxisY() {
        ctx.moveTo(0, yAxis);
        ctx.font = "15px Arial";
        ctx.fillText("y", xAxis - 2 * offsetAxis, offsetAxis * 2);
        ctx.moveTo(xAxis - offsetAxis / 2, offsetAxis);
        ctx.lineTo(xAxis, 0);
        ctx.moveTo(xAxis + offsetAxis / 2, offsetAxis);
        ctx.lineTo(xAxis, 0);
        ctx.stroke();
        for (let i = 0; i < labels.length; i++) {
            ctx.moveTo(xAxis - offsetAxis / 2, 2 * offsetAxis + gapBetweenNotchesY * i);
            ctx.lineTo(xAxis + offsetAxis / 2, 2 * offsetAxis + gapBetweenNotchesY * i);
            ctx.fillText(labels[i], xAxis + offsetAxis, 2 * offsetAxis + gapBetweenNotchesY * i);
            ctx.stroke();
        }
    }

    function designAxisX() {
        ctx.font = "15px Arial";
        ctx.moveTo(2 * xAxis - offsetAxis, yAxis - offsetAxis / 2);
        ctx.lineTo(2 * xAxis, yAxis);
        ctx.moveTo(2 * xAxis - offsetAxis, yAxis + offsetAxis / 2);
        ctx.lineTo(2 * xAxis, yAxis);
        ctx.fillText("x", 2 * xAxis - offsetAxis, yAxis + offsetAxis * 2);
        ctx.stroke();

        for (let i = 0; i < labels.length; i++) {
            ctx.moveTo(2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis - offsetAxis);
            ctx.lineTo(2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis + offsetAxis);
            ctx.fillText(labels[i], 2 * xAxis - 2 * offsetAxis - gapBetweenNotchesX * i, yAxis - 2 * offsetAxis);
            ctx.stroke();
        }

    }

    function drawShapes() {
        const ctx = canvas[0].getContext("2d");
        ctx.globalAlpha = 0.4;
        drawRectangle();
        drawCircle();
        drawTriangle();

        function drawCircle() {
            ctx.moveTo(xAxis, yAxis);
            ctx.fillStyle = "#15ecec";
            ctx.arc(xAxis, yAxis, gapBetweenNotchesX * r, 0, Math.PI * 0.5);
            ctx.fill();
            ctx.closePath();
        }

        function drawRectangle() {
            ctx.fillStyle = "#993132"
            ctx.fillRect(xAxis, yAxis, gapBetweenNotchesX * r / 2, -gapBetweenNotchesY * r);
            ctx.stroke();
        }

        function drawTriangle() {
            ctx.fillStyle = "#327313"
            ctx.moveTo(xAxis, yAxis);
            ctx.lineTo(xAxis, yAxis - gapBetweenNotchesY * r / 2);
            ctx.lineTo(xAxis - gapBetweenNotchesX * r, yAxis);
            ctx.fill();
            ctx.stroke();
        }
    }

    return drawShapes;
}




window.addEventListener('load', onload, false);
