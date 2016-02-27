//timer Model

//timer variable -- need globally to stop timer in counter().
var countDown;

//counterElm is the number in circle
var counterElm = document.getElementById('count'),
    fillCirc   = document.getElementById('fill'),
    workTime   = document.querySelector('#workTime'),
    breakTime  = document.querySelector('#breakTime');

//timer duration variables--> bound to adjustable work/break durations in adjustVal().
//where is count used??
//count is set from the value of the counter buttons in minutes
//it is used to set the secs that decrease in the timer (secs --);
var count,
    workCount  = 1,
    breakCount = 1;

//timer/animation variables
var player,
    timeObj = {},
    secs,
    dur;

//button Variables
var durButtons = document.querySelectorAll('i');
var workButton = document.getElementById('work'),
    breakButton = document.getElementById('break');

counterElm.textContent = String(workCount);
workTime.value  = workCount;
breakTime.value = breakCount;

//Set timer based on either Work or Break Time
//to know if it's a break or work -- might be replaced by the work/break variables.
var type = 'work';

function buttonsOn() {
    workButton.onclick = timerCtrl;
    breakButton.onclick = timerCtrl;
    workTime.disabled = false;
    breakTime.disabled = false;
    
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


//Todos:
//second timer double count???
//we need a second animation --> could be a second circle or just the first circle with another fill colour.
//change event to background of plus/minus so it doesn't select when you double click quickly.

//after animation finishes, make radius set to fill undercircle. Onfinish method? Or keep empty with new number.
//when timer stops, reset it to equal work time.
//add google's wave on buttons
//add reset timer - could leave break time active so you change break time while work time running, but this will be complicated.



//display hours:minutes:seconds in circle countdown

function timeFormat(t) {
    console.log('timeFormat()');
    //timer.js equiv -- timeCalc

    //based on: http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

    //count comes in from timerCtrl() (already set from either breakTime or workTime)

    //need to convert t from mins to ms

    var minutes = t;
    var seconds = t * 60;
    var milliseconds = seconds * 1000;

    console.log(minutes, seconds, milliseconds);

    return {
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds
    }
}

//animation player
function buildAnimation(dur){
    //count val comes from the buttons values.
    //calculate duration based on work or break

    //buildAnimation() called in timerCtrl and dur is calculated in timeFormat();

    console.log('dur: '+dur);

    //convert minutes to seconds
    // secs = count * 60;
    // //convert seconds to milliseconds > dur var controls how long the animation runs > tied directly to time of counter.
    // dur = secs * 1000;

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
    //equivalent of timerInit();
    console.log('in timerCtrl()');

    if(type === 'work'){
        console.log('type in timerCtrl if: '+type);
        count = workCount;
        type = 'break';
        buttonsOn();
    }

    else if(type === 'break'){
        console.log('type in timerCtrl if: '+type);
        count = breakCount;
        type  = 'work';
    }
    console.log('count in timerCtrl()'+count);

    //pass count (based on either break or work time in above if statements) into milliseconds for timeFormat() to process.

    timeObj = timeFormat(count); // may have to make this a global var.
    console.log(timeObj);

    //calculates duration based on work or break count and then builds animation player
    buildAnimation(timeObj.milliseconds);

    countDown = setInterval(counter, 1000);
    player.play();

    player.onfinish = function() {
        console.log('onfinish()');

        player.cancel();
            
        if(type === 'work') {
            console.log('buttonsOn');
            buttonsOn();
        }
    }
    
    buttonsOff();
}

function counter(){
    console.log('incounter')
    //milliseconds need to count down instead of secs
    //call in timeFormat(t) == t should = count, which will be in minutes. timeFormat will convert t to secs.

    console.log(timeObj);

    var ticks = timeObj.milliseconds;

    ticks -= 1000;

    //what displays in circle during timer. Should be min:sec
    // counterElm.textContent = String(secs);
    console.log(ticks);
    


    if(ticks === 0){
        clearInterval(countDown);
        if(type === 'work'){
            timerCtrl();
            type = 'break'
            }
    }
}

function adjustVal(evt){
    //try using the jsGame obj literal structure for all this:

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
    counterElm.textContent = String(workCount);
}