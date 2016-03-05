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
    var timerId, startTime, endTime, remaining = interval, remainingDate;
    var state = 0; // 0 = idle, 1 = running, 2 = paused, 3 = resumed

    this.pause = function() {
        if (state != 1) return;
		// get the current time? start time (3:00... paused at 2:55 (new date)
		var currTime = new Date();
        // remaining = addMinutes(new Date(), 25) - (currTime - startTime);
        remaining -= (currTime - startTime);
		remainingMS = currTime - startTime;

        // remainingDate = addMinutes(currTime, 25) - (currTime - startTime);
        window.clearInterval(timerId);
        state = 2;
        console.log('paused');
    };

    this.resume = function() {
        if (state != 2) return;

        state = 3;
		// setTimeout(this.timeoutCallback, remaining);
		this.timeoutCallback();
        timerId = window.setTimeout(this.timeoutCallback, remaining);
        // timerId = initializeClock(timerDiv, remaining);
    };

    this.timeoutCallback = function() {
        if(state != 3) return;

        //callback();

        // startTime = new Date();
        // need the time when it ended
        console.log("Remaining time is " + remainingMS + " " + new Date(remainingMS).getMinutes());
        remainingDate = addMinutes(new Date(), 25) - remainingMS;
        timerId = initializeClock(timerDiv, remainingDate);
        state = 1;
        console.log("Resuming");
        console.log('running Timer2');
    };

    startTime = new Date();
    endTime = addMinutes(startTime, 25);
    timerId = initializeClock(timerDiv, endTime);
    state = 1;
    console.log('running Timer1');
}

// to use
/*
var timer = new Timer(FUNCTION, 1000);
timer.pause();
timer.resume()
 */


document.getElementById("timerStart").onclick = startTimer;
document.getElementById("timerPause").onclick = pauseTimer
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
