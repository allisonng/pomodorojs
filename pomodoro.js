

function addMinutes(oldDate, min) {
    return new Date(oldDate.getTime() + min*60000); // 60x1000ms
}
// need to get diff between current_time and endTime
// function getTimeDiff();

var startTime = new Date();
var start_min = startTime.getMinutes();
console.log('start date is' + startTime.getTime());

// endTime should be 25 minutes from now
var endTime = addMinutes(startTime, 25);
console.log('end date is' + endTime.getTime());

function getTimeRemaining(endTime){
    // figure out time remaining between end_date and startTime
    var timeDiff = endTime.getTime() - startTime.getTime();
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


console.log('total '+ timeDiff + '\tminutes ' + minutes + '\tseconds ' + seconds);

function setTimer(id, endTime){
    var timer = document.getElementById(id);
    //NTS: setInterval executes fn continuously, endTime indicates millisecond timelength between each execution
    var timeInterval = setInterval(function() {
        var time = getTimeRemaining(endTime);
        timer.innerHTML = 'minutes: ' + time.days + ' seconds:' + time.seconds;

        if(time.milliseconds <= 0){
            clearInterval(timeInterval);
        };
    },1000);
}

initializeClock('');