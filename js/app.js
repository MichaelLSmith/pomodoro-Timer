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

console.dir(workTime);

//Set timer based on either Work or Break Time
//to know if it's a break or work -- might be replaced by the work/break variables.
var type = 'work';

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


//Todos:    
//we need a second animation --> could be a second circle or just the first circle with another fill colour.
//change event to background of plus/minus so it doesn't select when you double click quickly.

//after animation finishes, make radius set to fill undercircle. Onfinish method? Or keep empty with new number.
//when timer stops, reset it to equal work time.
//add google's wave on buttons

//display hours:minutes:seconds in circle countdown

function timeFormat() {
    //based on: http://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
    //minutes are set by the adjustVal buttons
    //so my 'total' is minutes

   var seconds = Math.floor( (t/1000) % 60 );
   var minutes = Math.floor( (t/1000/60) % 60 );
   var hours = Math.floor( (t/(1000*60*60)) % 24 );

    return {
        'total': t,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
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

    //what displays in circle during timer. Should be min:sec
    counterElm.textContent = String(secs);
    if(secs === 0){
        clearInterval(countDown);
        // type = 'break';
    }
}

function adjustVal(evt){
    //try using the jsGame obj literal structure for all this:

    //could change how count is set:
        //have plus/minus buttons just adjust input.val
        //is another event needed when input.val changes? Or can all this be done in adjustVal()?
        //count = input.val (either work or break)
        //counterElm.text content = input.val (defaults to work, but will switch to break when break counter runs. This happens already based on counter() counterElm.textContent = String(secs))



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
    workTime.value  = String(workCount);
    breakTime.value = String(breakCount);

    console.log('workCount: '+workCount);
    console.log('breakCount: '+breakCount);
}

function adjustStaticCounter(){
    //when user adjust value
}