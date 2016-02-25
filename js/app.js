//timer Model

//timer variable -- need globally to stop timer in counter().
var countDown;
//counterElm is the number in circle
var counterElm = document.getElementById('count'),
    workTime   = document.querySelector('#workTime'),
    breakTime  = document.querySelector('#breakTime');

//timer duration variables--> bound to adjustable work/break durations in adjustVal().
var count,
    workCount  = 1,
    breakCount = 1;

//Set timer based on either Work or Break Time
//to know if it's a break or work -- might be replaced by the work/break variables.
var type = 'work';

if(type === 'work'){
    console.log('in if type work')
    count = parseInt(workTime.textContent);
    console.log(count);
}

if(type === 'break'){
    count = parseInt(breakTime.textContent);
}
  
// counterElm.textContent = String(count);

    //after the work timer finishes, we need another timer based on the break value --> or just re-run same timer based on break duration.
    //we also need a second animation --> could be a second circle or just the first circle with another fill colour.


//after animation finishes, make radius set to fill undercircle. Onfinish method? Or keep empty with new number.
//when timer stops, reset it to equal work time.

//make timer based on work/break val, not count. Just make count display the timer current time.

//for break
    //
    // -- either new circle, or just change fill colour
    //after work, and before break fill colour (radius) should reset to zero.

//add google's wave on buttons


//convert minutes to seconds
var secs = count * 60;
//convert seconds to milliseconds > dur var controls how long the animation runs > tied directly to time of counter.
var dur = secs * 1000;

//timer controls
var typeButtons = document.querySelectorAll('.typeText');
console.dir(typeButtons);

for (var t = 0; t < typeButtons.length; t++) {
    typeButtons[t]
        .addEventListener('click', timerCtrl, true);
}

//timer duration controller:
var durButtons = document.querySelectorAll('i');
for(var i = 0; i < 4; i++){
    durButtons[i]
        .addEventListener('click', adjustVal, true);
}

//animation player
    player = document.getElementById('fill')
        .animate([
            { r: 0 },
            { r: 95 }
            ],{
                duration: dur,
                direction: 'alternate',
                iterations: 1
            });
        player.pause();

console.log('dur: '+dur);
console.dir(player);
console.dir(document.getElementById('fill'));

function timerCtrl(){
    console.log('in timerCtrl()');
    countDown = setInterval(counter, 1000);
    player.play();
    console.dir(player);

    //disable time buttons
    console.log(durButtons);
    for (var a = 0; a < dur.length; a++) {
        console.log(durButtons[a]);
        durButtons[a].removeEventListener('click', adjustVal, true);
    }
}

function counter(){
    secs --;
    counterElm.textContent = String(secs);
    if(secs === 0){
        clearInterval(countDown);
        type = 'break';
    }
}

function adjustVal(evt){
    // console.dir(evt);
    //try using the jsGame obj literal structure for all this:

    //workTime.textContent is a string
    //workDuration needs to be a number
    // var workDuration = workTime.textContent;

    //maybe the simplest way to control the timer duration is to have two variables. One call work and one called break. They would be numbers and would be adjusted independently of each other. If user clicks work button, the timer starts using the work duration, followed by the break duration. If the user clicks break button, the timer uses the break duration, followed by the work duration. It can only run one cycle.
    //the type variable would change (to 'work' or 'break') depending on which button is pressed. The timer would run based on either 'work' or 'break' duration.

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


    
    //Original set-up when timer was based on circle number:
    // var counterStr = String(count);
    // console.log(counterStr);
    // counterElm.textContent = counterStr;
    // workTime.textContent = counterStr;
    // console.log(workTime.textContent);



}