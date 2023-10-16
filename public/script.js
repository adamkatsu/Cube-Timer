let num = document.querySelector("span");
let count = 0;
let minutes = 0;
let sec = 0;
let secMinOne = 0;
let int = null;


// Main Timer Logic

function startTimer() {
  if (int !== null) {
    // If Timer is Running, Stop
    clearInterval(int);

    // Store Result in avglist array
    avglist.push(`${minutes}:${sec}.${secMinOne}${count}`)
    console.log(`timer stopped, time is = ${minutes}:${sec}.${secMinOne}${count}`);

    // Reset Timer 
    count = 0;
    sec = 0;
    secMinOne = 0;
    int = null;

  } else {
    // Else If Timer isn't Running, Start
    int = setInterval(addNum, 10);
    console.log(`timer started`);
  }
}
function addNum() {
  count += 1;

  // Under 1 Minute
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



// Store and Count Average

let avglist = []