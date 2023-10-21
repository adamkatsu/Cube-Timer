// Notes:

// We have 3 lists of solves
// 1. avgList = finished process [array], will be shown in list of solves in HTML
// 2. avgStorage = list in localStorage
// 3. newList = temporary [array] that have been updated with previous time. 

// We save session history in localStorage

let num = document.querySelector(".time-show");
const timeList = document.getElementById('results');
let count = 0;
let minutes = 0;
let sec = 0;
let secMinOne = 0;
let int = null;
let avgList = [];


// Get localStorage when page load
let avgStorage = localStorage.getItem('session');

// Check if session exist
if(avgStorage === null) {
  // If not exist, let it be
  avgList = [];
} else {
  // If exist, turn avgStorage [string] to avgList [array], show in list of solves in HTML
  avgList = avgStorage.split(',');
  printSolves(avgList);
}


// Main Timer Function
function startTimer() {
  if (int !== null) {
    // If Timer is Running, STOP.
    clearInterval(int);
    console.log(`timer stopped, time is = ${minutes}:${sec}.${secMinOne}${count}`);

    // Store Result in avglist array
    if (sec < 10) {
      avgList.push(`${minutes}:0${sec}.${secMinOne}${count}`);
    } else {
      avgList.push(`${minutes}:${sec}.${secMinOne}${count}`);
    }

    // Save avgList in LocalStorage
    localStorage.setItem('session', avgList);
    let avgStorage = localStorage.getItem('session');
    let newList = avgStorage.split(','); // Temporary array to print new list.

    printSolves(newList);

    // Reset Timer 
    count = 0;
    sec = 0;
    secMinOne = 0;
    minutes = 0;
    int = null;

  } else {
    // If timer is not running, START.
    int = setInterval(addNum, 10);
    console.log(`timer started`);
  }
}


// Increment Seconds
function addNum() {
  count += 1;

  // Check if under 1 minute
  if(minutes < 1) {

    num.innerHTML = `${sec}.${secMinOne}${count}`;

    if (count === 10) {
      secMinOne ++;
      count = 0;
      num.innerHTML = `${sec}.${secMinOne}${count}`;
  
      if (secMinOne === 10) {
        sec ++;
        secMinOne = 0;
        num.innerHTML = `${sec}.${secMinOne}${count}`;
  
        if(sec === 60) {
          minutes ++;
          sec = 0;
          num.innerHTML = `${minutes}:${sec}.${secMinOne}${count}`;
        }
      }
    }
  } else {

    // Over 1 Minute
    if(sec < 10) {
      num.innerHTML = `${minutes}:0${sec}.${secMinOne}${count}`;
    } else {
      num.innerHTML = `${minutes}:${sec}.${secMinOne}${count}`;
    }

    if (count === 10) {
      secMinOne ++;
      count = 0;

      if(sec < 10) {
        num.innerHTML = `${minutes}:0${sec}.${secMinOne}${count}`;
      } else {
        num.innerHTML = `${minutes}:${sec}.${secMinOne}${count}`;
      }
  
      if (secMinOne === 10) {
        sec ++;
        secMinOne = 0;

        if(sec < 10) {
          num.innerHTML = `${minutes}:0${sec}.${secMinOne}${count}`;
        } else {
          num.innerHTML = `${minutes}:${sec}.${secMinOne}${count}`;
        }
  
        if(sec === 60) {
          minutes ++;
          sec = 0;
          
          if(sec < 10) {
            num.innerHTML = `${minutes}:0${sec}.${secMinOne}${count}`;
          } else {
            num.innerHTML = `${minutes}:${sec}.${secMinOne}${count}`;
          }
        }
      }
    }
  }
}

function printSolves(x) {
  timeList.innerHTML = ""; // Clear list to make room for new list

  // Show results, Loop through each array
  x.forEach(item => {
    const spanElement = document.createElement("span");
    spanElement.classList.add('result-time');
    spanElement.textContent = `${item}`;
    timeList.appendChild(spanElement);
    timeList.appendChild(document.createTextNode(", "));
  });
  timeList.removeChild(timeList.lastChild); // Remove the coma from last array

  document.getElementById('results-count').innerHTML = `Solves: ${x.length}`;
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
document.getElementById('btn-reset').addEventListener("click", () => {
  num.innerHTML = `0.00`;
  timeList.innerHTML = ``;
  avgList = [];
  localStorage.removeItem('session');
  document.getElementById('results-count').innerHTML = `Solves: 0`;

});
