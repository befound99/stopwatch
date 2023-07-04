const startStopElement = document.querySelector("#js-start-stopwatch");
const resetElement = document.querySelector("#js-reset-stopwatch");
const millisecondsElement = document.querySelector("#js-milliseconds");
const secondsElement = document.querySelector("#js-seconds");
const minutesElement = document.querySelector("#js-minutes");
const hourElement = document.querySelector("#js-hour");
const confirmResetElement = document.querySelector(
  "#js-reset-confirmation-message"
);

startStopElement.addEventListener("click", startStop);
resetElement.addEventListener("click", confirmReset);

let isStopwatchRunning = false;

function startStop() {
  if (isStopwatchRunning) {
    stopStopwatch();

    return;
  }
  startStopwatch();
}

let intervalId1;
let watch;
function getWatch() {
  watch = JSON.parse(localStorage.getItem("watch")) || {
    milliseconds: 0,
    seconds: 0,
    minutes: 0,
    hour: 0,
  };
  return watch;
}
let { milliseconds, seconds, minutes, hour } = getWatch();
displayWatch();
hideConfirmReset();

function setWatch() {
  watch = {
    milliseconds,
    seconds,
    minutes,
    hour,
  };
  localStorage.setItem("watch", JSON.stringify(watch));
}

function startStopwatch() {
  startStopElement.classList.add("stopwatch__actions-stop");
  hideConfirmReset();
  startStopElement.innerText = "Stop";
  isStopwatchRunning = true;

  intervalId1 = setInterval(() => {
    milliseconds++;
    if (milliseconds === 100) {
      millisecondsElement.innerText = "00";
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hour++;
    }
    displayWatch();
    setWatch();
  }, 10);
}

function stopStopwatch() {
  startStopElement.classList.remove("stopwatch__actions-stop");
  startStopElement.innerText = "Start";
  isStopwatchRunning = false;

  clearInterval(intervalId1);
  setWatch();
}

function displayWatch() {
  millisecondsElement.innerText = `${milliseconds}`.padStart(2, "0");
  secondsElement.innerText = `${seconds}`.padStart(2, "0") + ":";
  minutesElement.innerText = `${minutes}`.padStart(2, "0") + ":";
  hourElement.innerText = `${hour}`.padStart(2, "0") + ":";
}

function confirmReset() {
  stopStopwatch();
  confirmResetElement.classList.remove("hide");
  document.addEventListener("click", handleResetConfirmation);
}

function handleResetConfirmation(event) {
  if (event.target.id === "js-yes-reset") {
    resetWatch();
    hideConfirmReset();
  } else if (event.target.id === "js-no-reset") {
    hideConfirmReset();
  }
}
function hideConfirmReset() {
  confirmResetElement.classList.add("hide");
}

function resetWatch() {
  localStorage.removeItem("watch");
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hour = 0;
  displayWatch();
}

export { startStopwatch };
