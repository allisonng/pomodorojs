
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

var timeInterval, currTime;

function initializeClock(id, endTime){
    var timer = document.getElementById(id);
    var minutesSpan = timer.querySelector("#" + id.toString() + "Minutes");
    var secondsSpan = timer.querySelector("#" + id.toString() + "Seconds");

    function updateTimer() {
    	currTime = endTime;
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

}


document.getElementById("timerStart").onclick = startTimer;
document.getElementById("timerPause").onclick = pauseTimer;
document.getElementById("timerResume").onclick = resumeTimer;

function startTimer(){
    console.log('started timer');
    document.getElementById('timerStarted').style.display = 'block';
    document.getElementById('timerDefault').style.display = 'none';

    var startTime = new Date();
// endTime should be 25 minutes from now
    var endTime = addMinutes(startTime, 25);

    initializeClock('timer', endTime);
	
}

function pauseTimer(){
	// need to get current date object in order to resume?
	// clear interval, and then 'initialize clock' with the date
	clearInterval(timeInterval);
	console.log("cleared");
}

function resumeTimer(){
	initializeClock('timer', currTime);
	console.log("reinit with timeLeft" + currTime);
	
}
