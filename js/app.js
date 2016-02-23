//timer Model

//timer variables:
var countDown;
var counterElm = document.getElementById('count');
var workTime = document.querySelector('#workTime');
console.log(workTime.textContent);
var count = parseInt(counterElm.textContent);
console.log(count);

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

    //after animation finishes, make radius set to fill undercircle. Onfinish method?

//Animation Controller:
//how to start animation when timer starts
//right now it's running on page load -- think I have solution!
//player object is empty. Have to call animationCtrl from click on play button.
//for break -- either new circle, or just change fill colour
//after work, and before break fill colour (radius) should reset to zero.

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
    // for (var a = 0; a < dur.length; a++) {
    //     dur[a].removeEventListener('click', adjustVal, true);
    // }
}

function counter(){
    secs --;
    counterElm.textContent = String(secs);
    if(secs === 0){
        clearInterval(countDown);
    }
}

//how to lock out timer val buttons while running??
//display mins/secs on circle
//when timer stops, reset it to equal work time. 
//can't run under zero - right now if you press start, it will start counting into negatives.
//make count equal work/break time, not the counter in the circle. The counter in the circle should just display the time, not control the timer.
//if the start/stop functionality moves to circle, it will fix the problem of changing time starting the timer.


function adjustVal(evt){
    console.dir(evt);
    if(evt.target.id === 'workAdd'){
        console.log('if workAdd');
        count += 1;
        console.log(count);
    }
    if(evt.target.id === 'workSubtract'){
        count -= 1;
    }

    if(evt.target.id === 'breakAdd'){

    }

    if(evt.target.id === 'breakSubtract'){

    }
    var counterStr = String(count);
    console.log(counterStr);
    counterElm.textContent = counterStr;
    workTime.textContent = counterStr;
    console.log(workTime.textContent);
}