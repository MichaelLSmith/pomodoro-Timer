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

//add google's wave on buttons

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

//Animation Controller:
//after animation finishes, make radius set to fill undercircle. Onfinish method?
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
    }
}

//when timer stops, reset it to equal work time. 

function adjustVal(evt){
    console.dir(evt);
    //try using the jsGame obj literal structure for all this:
    if(evt.target.id === 'workAdd'){
        console.log('if workAdd');
        count += 1;
    }
    if(evt.target.id === 'workSubtract'){
        if(count > 0){ console.log('0 if statement'); count -= 1; }
        else count = 0;
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