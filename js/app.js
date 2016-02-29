//timer Model

//timer variable -- need globally to stop timer in counter().
var countDown;

//counterElm is the number in circle
var counterElm = document.getElementById('count'),
    fillCirc   = document.getElementById('fill'),
    workTime   = document.querySelector('#workTime'),
    breakTime  = document.querySelector('#breakTime');

//timer duration variables--> bound to adjustable work/break durations in adjustVal().
var count,
    workCount  = 25,
    breakCount = 5;

//timer/animation variables
var player,
    milliseconds;

//button Variables
var durButtons = document.querySelectorAll('i');
var workButton = document.getElementById('work'),
    breakButton = document.getElementById('break');

counterElm.textContent = String(workCount);
workTime.value  = workCount;
breakTime.value = breakCount;

var type = 'work';

function buttonsOn() {
    workButton.onclick = timerCtrl;
    breakButton.onclick = timerCtrl;
    workTime.disabled = false;
    breakTime.disabled = false;
    workTime.onchange = adjustVal;
    breakTime.onchange = adjustVal;
    
    for(var i = 0; i < 4; i++){
    durButtons[i]
        .addEventListener('click', adjustVal, true);
    }
}

function buttonsOff(){
    workButton.onclick = null;
    breakButton.onclick = null;
    workTime.setAttribute("disabled", true);
    breakTime.setAttribute("disabled", true);

    for(var i = 0; i < 4; i++){
    durButtons[i]
        .removeEventListener('click', adjustVal, true);
    }
}

buttonsOn();

function timeFormat(t) {
    //based on: http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var milliseconds = t;

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    }
}

//animation player
function buildAnimation(dur){
    player = fillCirc.animate([
        { r: 0 },
        { r: 95 }
        ],{
            duration: dur,
            direction: 'alternate',
            iterations: 1
        });
    player.pause();
}

function timerCtrl(evt){
    console.log('in timerCtrl()');

    if(type === 'work'){
        console.log('type in timerCtrl if: '+type);
        count = workCount;
        type = 'break';
        console.log(type);
        buttonsOn();
    }

    else if(type === 'break'){
        console.log('type in timerCtrl if: '+type);
        count = breakCount;
        type  = 'work';
    }

    //calculates duration based on work or break count and then builds animation player
    milliseconds = (+count * 60) * 1000;
    buildAnimation(milliseconds);
    countDown = setInterval(counter, 1000);
    player.play();

    player.onfinish = function() {
        player.cancel();       
        if(type === 'work') {
            buttonsOn();
        }
    }
    
    buttonsOff();
}

function counter(){
    var t = timeFormat(milliseconds);
    milliseconds -= 1000;

    if(t.minutes === 0){
        counterElm.textContent = t.seconds;
    }
    else counterElm.textContent = t.minutes+':'+t.seconds;

    if(t.milliseconds === 0){
        clearInterval(countDown);
        if(type === 'break'){
            timerCtrl();
            type = 'work';
            }
    }
}

function adjustVal(evt){
    //try using the jsGame obj literal structure for all this:
    // if(workTime.valueAsNumber > 24){ workTime.valueAsNumber = 25; }
    // if(breakTime.valueAsNumber > 24){ breakTime.valueAsNumber = 25; }

    if(evt.target.id === 'workAdd'){
        workTime.stepUp(1);

    }
    if(evt.target.id === 'workSubtract'){
        if(workTime.valueAsNumber > 0){ workTime.stepDown(1); }
        else workTime.value = '0';
    }

    if(evt.target.id === 'breakAdd'){
        breakTime.stepUp(1);
    }

    if(evt.target.id === 'breakSubtrack'){
        if(breakTime.valueAsNumber > 0){ breakTime.stepDown(1); }
        else breakTime.value = '0';
    }
   
    //bind the circle time display to the count variable of timer:
    workCount  = workTime.valueAsNumber;
    breakCount = breakTime.valueAsNumber;
    counterElm.textContent = workTime.value;
}