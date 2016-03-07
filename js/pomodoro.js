var timerDiv = 'timer';


function addMinutes(oldDate, min) {
    return new Date(oldDate.getTime() + min*60000); // 60x1000ms
}


function getTimeRemaining(endTime){
    // figure out time remaining between end_date and startTime
    var timeDiff = endTime - Date.parse(new Date());

    // convert millseconds into actual usable chunks
    var minutes = Math.floor((timeDiff/1000/60)%60);
    var seconds = Math.floor((timeDiff/1000)%60);
    return{
        'total': timeDiff,
        'milliseconds': timeDiff,
        'minutes': minutes,
        'seconds': seconds
    };
}

var timeInterval;

// parses date object into mins/secs for display
function initializeClock(id, endTime){
    console.log("initializing");
    var timer = document.getElementById(id);
    var minutesSpan = timer.querySelector("#" + id.toString() + "Minutes");
    var secondsSpan = timer.querySelector("#" + id.toString() + "Seconds");

    function updateTimer() {
        var timeLeft = getTimeRemaining(endTime);
        //slice(2) makes sure there's at least a 0 in front of a single digit)
        minutesSpan.innerHTML = ('0' + timeLeft.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + timeLeft.seconds).slice(-2);

        if(timer.milliseconds <= 0){
            clearInterval(timeInterval);
        }
    }

    updateTimer();
    timeInterval = setInterval(updateTimer, 1000);

    return timeInterval;
}

function Timer(callback, interval) {
    var timerId, timeoutId, startTime, endTime, remaining, remainingMS, remainingDate;
    var state = 0; // 0 = idle, 1 = running, 2 = paused, 3 = resumed

    this.pause = function() {
        if (state != 1) return;

		var currTime = new Date();
		remainingMS = currTime - startTime;
        remaining =  interval - remainingMS;
        startTime = new Date();
        state = 2;
        window.clearInterval(timerId);
    };

    this.resume = function() {
        if (state != 2) return;

        state = 3;
        this.timeoutCallback();
    };

    this.timeoutCallback = function() {
        if(state != 3) return;

        //console.log("callback timeoutId BEFORE" + timeoutId);
        remainingDate = new Date(addMinutes(startTime, 25) - remainingMS);
        timerId = callback(timerDiv, remainingDate);
        startTime = new Date();
        state = 1;
    };

    startTime = new Date();
    endTime = addMinutes(startTime, 25);
    timerId = callback(timerDiv, endTime);
    state = 1;
}

// to use
/*
var timer = new Timer(FUNCTION, 1000);
timer.pause();
timer.resume()
 */


document.getElementById("timerStart").onclick = startTimer;
document.getElementById("timerPause").onclick = pauseTimer;
document.getElementById("timerResume").onclick = resumeTimer;

var timer;

function startTimer(){
    console.log('started timer');
    document.getElementById('timerStarted').style.display = 'block';
    document.getElementById('timerDefault').style.display = 'none';

    //var startTime = new Date();
    //var endTime = addMinutes(startTime, 25);

    timer = new Timer(initializeClock, 1000);

}

function pauseTimer(){
	// need to get current date object in order to resume?
	// clear interval, and then 'initialize clock' with the date
    if(timer){
        timer.pause();
    }
}

function resumeTimer(){
    if(timer){
        timer.resume();
    }
}

//
//window.setTimeout(function () {
//    timer.pause(); window.setTimeout( function () {
//        timer.resume();
//    }, 5000);
//}, 2000);
