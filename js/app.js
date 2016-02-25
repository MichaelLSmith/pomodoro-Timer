//timer Model

//timer variable -- need globally to stop timer in counter().
var countDown;
//variable that sets duration of timer --> bound to adjustable work/break durations
var count;
//counterElm is the number in circle
var counterElm = document.getElementById('count');
var workTime = document.querySelector('#workTime');
var breakTime = document.querySelector('#breakTime');



//Set timer based on either Work or Break Time
//to know if it's a break or work
var type = 'work';

if(type === 'work'){
    console.log('in if type work')
    count = parseInt(workTime.textContent);
    console.log(count);
}

if(type === 'break'){
    count = parseInt(breakTime.textContent);
}
  
counterElm.textContent = String(count);

    //after the work timer finishes, we need another timer based on the break value --> or just re-run same timer based on break duration.
    //we also need a second animation --> could be a second circle or just the first circle with another fill colour.


// console.log(workTime.textContent);
// console.log(count);


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
    if(evt.target.id === 'workAdd'){
        console.log('if workAdd');
        count += 1;
    }
    if(evt.target.id === 'workSubtract'){
        if(count > 0){ count -= 1; }
        else count = 0;
    }

    if(evt.target.id === 'breakAdd'){
        count += 1;
    }

    if(evt.target.id === 'breakSubtrack'){
        if(count > 0){ count -= 1; }
        else count = 0;
    }
    //bind the circle time display to the count variable of timer:
    counterElm.textContent = String(count);
    workTime.textContent = String(count);


    
    //Original set-up when timer was based on circle number:
    // var counterStr = String(count);
    // console.log(counterStr);
    // counterElm.textContent = counterStr;
    // workTime.textContent = counterStr;
    // console.log(workTime.textContent);



}