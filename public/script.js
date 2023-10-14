let num = document.querySelector("span");
let count = 0;
let sec = 0;
let secMinOne = 0;
let int = null;


// Timer Logic

function startTimer() {
  if (int !== null) {
    clearInterval(int);
    console.log(`timer stopped, time is = ${sec}.${secMinOne}${count}`);
    count = 0;
    sec = 0;
    secMinOne = 0;
    int = null;
  } else {
    num.innerHTML = count;
    int = setInterval(addNum, 10);
    console.log(`timer started`);
  }
}
function addNum() {
  count += 1;
  num.innerHTML = `${sec}.${secMinOne}${count}`;

  if (count === 10) {
    secMinOne += 1;
    count = 0;
    num.innerHTML = `${sec}.${secMinOne}${count}`;

    if (secMinOne === 10) {
      sec += 1;
      secMinOne = 0;
      num.innerHTML = `${sec}.${secMinOne}${count}`;
    }
  }
}



// Event Listeners


// Space key to start timer
window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    document.getElementById("app-timer").classList.toggle("timer-on");
    startTimer();
  }
});

// Button function
document.querySelector("button").addEventListener("click", () => {
  num.innerHTML = `0.00`;
});
