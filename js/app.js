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

//Set timer based on either Work or Break Time
//to know if it's a break or work -- might be replaced by the work/break variables.
var type = 'work';

// //don't know if I need this function. Might just change it with assignment.
// function changeDur(evt){
//     if(evt.target.id === 'work'){
//        count = workCount; 
//     }
//     if(evt.target.id === 'break'){
//         count = breakCount;
//     }
// }

function buttonsOn() {
    workButton.onclick = timerCtrl;
    breakButton.onclick = timerCtrl;

    for(var i = 0; i < 4; i++){
    durButtons[i]
        .addEventListener('click', adjustVal, true);
    }
}

function buttonsOff(){
    workButton.onclick = null;
    breakButton.onclick = null;

    for(var i = 0; i < 4; i++){
    durButtons[i]
        .removeEventListener('click', adjustVal, true);
    }
}

buttonsOn();
  

    //after the work timer finishes, we need another timer based on the break value --> or just re-run same timer based on break duration.
    //we also need a second animation --> could be a second circle or just the first circle with another fill colour.


//after animation finishes, make radius set to fill undercircle. Onfinish method? Or keep empty with new number.
//when timer stops, reset it to equal work time.

//make timer based on work/break val, not count. Just make count display the timer current time.
//display mins and secs in circle

//for break
    //
    // -- either new circle, or just change fill colour
    //after work, and before break fill colour (radius) should reset to zero.

//add google's wave on buttons

//animation player

function buildAnimation(){

    //calculate duration based on work or break
    //convert minutes to seconds
    secs = count * 60;
    //convert seconds to milliseconds > dur var controls how long the animation runs > tied directly to time of counter.
    dur = secs * 1000;

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
    //may not need evt var
    console.log('in timerCtrl()');
    console.log(type);
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

    //what displays in circle. Should be min:sec
    counterElm.textContent = String(secs);
    if(secs === 0){
        clearInterval(countDown);
        // type = 'break';
    }
}

function adjustVal(evt){
    // console.dir(evt);
    //try using the jsGame obj literal structure for all this:

    //workTime.textContent is a string
    //workDuration needs to be a number
    // var workDuration = workTime.textContent;

    //maybe the simplest way to control the timer duration is to have two variables. One call work and one called break. They would be numbers and would be adjusted independently of each other. If user clicks work button, the timer starts using the work duration, followed by the break duration.

    if(evt.target.id === 'workAdd'){
        workCount += 1;
    }
    if(evt.target.id === 'workSubtract'){
        if(workCount > 0){ workCount -= 1; }
        else workCount = 0;
    }

    if(evt.target.id === 'breakAdd'){
        breakCount += 1;
    }

    if(evt.target.id === 'breakSubtrack'){
        if(breakCount > 0){ breakCount -= 1; }
        else breakCount = 0;
    }
    //bind the circle time display to the count variable of timer:
    // counterElm.textContent = String(count);
    workTime.textContent = String(workCount);
    breakTime.textContent= String(breakCount);

    console.log('workCount: '+workCount);
    console.log('breakCount: '+breakCount);
}