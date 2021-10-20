const intervalMS = 5000;
function initClock() {
    setDateTime();
    setInterval(setDateTime, intervalMS);
}

function addLeadingZero(number) {
    return (number < 10) ? '0' + number : number;
}

function setDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = addLeadingZero(day)
    month = addLeadingZero(month)

    $('.clock-date').html(`${day}.${month}.${year}`);
}

function setTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    hours = addLeadingZero(hours);
    minutes = addLeadingZero(minutes);
    seconds = addLeadingZero(seconds);

    $('.clock-time').html(`${hours}:${minutes}:${seconds}`);
}

function setDateTime() {
    let date = new Date();
    setDate(date);
    setTime(date);
}

window.addEventListener("load", initClock, false);