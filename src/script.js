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
    newScramble(3);

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

// Print Results List
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

// SCRAMBLE
let scrambleArgs = [
  [
    ['L','L','L2','Lw','Lw2'],
    ['R','R','R2','Rw','Rw2']
  ],
  [
    ['U','U','U2','Uw','Uw2'],
    ['D','D','D2','Dw','Dw2']
  ],
  [
    ['F','F','F2','Fw','Fw2'],
    ['B','B','B2','Bw','Bw2']
  ]
]

function newScramble(dim) {
  let scrambleArr = []
  let scrambleCount = 0;

  // Print Scramble 21 times
  while(scrambleCount < 21) {
    let dims = Math.floor(Math.random() * 3)
    let side = Math.floor(Math.random() * 2);
    let turn = Math.floor(Math.random() * dim);
    let argPush = false;

    // Check if latest args is contained in any 2 args before
    // Also check if there is consecutive args

    const condOne = scrambleArgs[dims][side].includes(scrambleArr[scrambleArr.length -1])
    const condTwo = scrambleArgs[dims][side].includes(scrambleArr[scrambleArr.length -2])

    if(condOne) {
      // console.log(`(R)  ${scrambleArgs[dims][side][turn]}, ${scrambleArr[scrambleArr.length -1]}, ${scrambleArr[scrambleArr.length -2]}`)
    } else if(condTwo) {
      // console.log(`(R)  ${scrambleArgs[dims][side][turn]}, ${scrambleArr[scrambleArr.length -1]}, ${scrambleArr[scrambleArr.length -2]}`)
    }else {
      argPush = true
    }

    if(argPush) {
      // console.log(`(${scrambleCount})  ${scrambleArgs[dims][side][turn]}, ${scrambleArr[scrambleArr.length -1]}, ${scrambleArr[scrambleArr.length -2]}`)
      scrambleArr.push(scrambleArgs[dims][side][turn]);
      document.getElementById('scramble').innerHTML = `${scrambleArr.join(' ')}`
      scrambleCount++
    }
  }
}
newScramble(3);



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
  newScramble(3);
  localStorage.removeItem('session');
  document.getElementById('results-count').innerHTML = `Solves: 0`;
});




