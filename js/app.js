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
    workCount  = 1,
    breakCount = 1;

//timer/animation variables
var player,
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
//we need a second animation --> could be a second circle or just the first circle with another fill colour.
//change event to background of plus/minus so it doesn't select when you double click quickly.

//after animation finishes, make radius set to fill undercircle. Onfinish method? Or keep empty with new number.
//when timer stops, reset it to equal work time.
//add google's wave on buttons
//add reset timer - could leave break time active so you change break time while work time running, but this will be complicated.



//display hours:minutes:seconds in circle countdown

function timeFormat() {
    //based on: http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
    //minutes are set by the adjustVal buttons
    //so my 'total' is minutes

    console.log(workCount);

    if(type === 'work'){var t = workCount}
    if(type === 'break'){t = breakCount}

    var seconds = Math.floor( t * 60 );
    console.log(seconds)
    // var minutes = Math.floor( (t/1000/60) % 60 );
    // var hours = Math.floor( (t/(1000*60*60)) % 24 );

    // return {
    //     'total': t,
    //     'hours': hours,
    //     'minutes': minutes,
    //     'seconds': seconds
    // };
}

//animation player
function buildAnimation(){

    //calculate duration based on work or break
    //convert minutes to seconds
    secs = count * 60;
    //convert seconds to milliseconds > dur var controls how long the animation runs > tied directly to time of counter.
    dur = secs * 1000;

 

//add hr:mins:secs calculation from function here??





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
    console.log(type);

    //get Date Obj
    var d = new Date();
    var h = d.getHours()
    console.dir(h);


    if(type === 'work'){
        count = workCount;
        type = 'break';
        buttonsOn();
    }
    console.log(count);

    //calculates duration based on work or break count and then builds animation player
    buildAnimation(dur);

    countDown = setInterval(counter, 1000);
    player.play();

    player.onfinish = function() {
        console.log('onfinish()');

        player.cancel();
        
        if(type === 'break'){
            count = breakCount;
            timerCtrl();
            type = 'work';
            console.log(type);
            //need to change the colour of the fill for break
        }

        else if(type === 'work') {
            console.log('buttonsOn');
            buttonsOn();
        }
    }
    
    buttonsOff();
}

function counter(){
    secs --;

    //what displays in circle during timer. Should be min:sec
    counterElm.textContent = String(secs);
    if(secs === 0){
        clearInterval(countDown);
        // type = 'break';
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

    timeFormat();

    //bind the circle time display to the count variable of timer:
    workCount  = workTime.valueAsNumber;
    breakCount = breakTime.valueAsNumber;
    counterElm.textContent = String(workCount);
}
