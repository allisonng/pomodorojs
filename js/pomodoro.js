var timerDiv = 'timer',
    timeInterval = 1000,
    fullTimerPeriod = 25;

function addMinutes(oldDate, min) {
    return new Date(oldDate.getTime() + min*60000); // 60x1000ms
}

function getTimeRemaining(endTime){
    // figure out time remaining between end_date and right now
    var timeDiff = endTime - new Date();

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


// parses date object into mins/secs for display
function initializeClock(id, endTime){
    var timerDiv = document.getElementById(id);
    var minutesSpan = timerDiv.querySelector("#" + id.toString() + "Minutes");
    var secondsSpan = timerDiv.querySelector("#" + id.toString() + "Seconds");

    function updateTimer() {
        var timeLeft = getTimeRemaining(endTime);
        //slice(2) makes sure there's at least a 0 in front of a single digit)
        minutesSpan.innerHTML = ('0' + timeLeft.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + timeLeft.seconds).slice(-2);

        if(timeLeft.milliseconds <= 0){
            clearInterval(timerId);
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
        }
    }

    updateTimer();
    var timerId = setInterval(updateTimer, timeInterval);
    return timerId;
}

function Timer(callback, timeInterval) {
    var timerId, totalElapsedTime = 0, startTime, endTime, remaining, remainingMS, remainingDate;
    var state = 0; // 0 = idle, 1 = running, 2 = paused, 3 = resumed

    this.pause = function() {
        if (state != 1) return;

		var currTime = new Date();
		remainingMS = currTime - startTime;
        totalElapsedTime += remainingMS;
        remaining =  timeInterval - remainingMS;
        console.log("pause() \ncurrtime " + currTime + "\nstartTime " + startTime +
        "\nRemainingMS " + remainingMS + "\nElapsedTime " + totalElapsedTime);
        state = 2;
        window.clearInterval(timerId);
    };

    this.resume = function() {
        if (state != 2) return;

        state = 3;
        setTimeout(this.timeoutCallback, remaining);
    };

    this.timeoutCallback = function() {
        if(state != 3) return;

        //console.log("callback timeoutId BEFORE" + timeoutId);
        //remainingDate = new Date(addMinutes(startTime, 25) - remainingMS);
        remainingDate = new Date(addMinutes(new Date(), fullTimerPeriod) - totalElapsedTime);
        timerId = callback(timerDiv, remainingDate);
        startTime = new Date();
        console.log("startTime " + startTime + "\nElapsedTime " + totalElapsedTime);
        state = 1;
    };

    startTime = new Date();
    endTime = addMinutes(startTime, fullTimerPeriod);
    timerId = callback(timerDiv, endTime);
    state = 1;
}

var startButton, pauseButton, resumeButton;

document.getElementById("timerStart").onclick = startTimer;
document.getElementById("timerPause").onclick = pauseTimer;
document.getElementById("timerResume").onclick = resumeTimer;

var timer;

function startTimer(){
    document.getElementById('timerStarted').style.display = 'block';
    document.getElementById('timerDefault').style.display = 'none';

    timer = new Timer(initializeClock, timeInterval);

}

function pauseTimer(){
    // remove start button
    if(timer){
        document.getElementsById('timerStarted').style.display = 'none';
        timer.pause();
    }
}

function resumeTimer(){
    if(timer){
        timer.resume();
    }
}