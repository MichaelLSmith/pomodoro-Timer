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
var timerButtons = document.querySelectorAll('#work, #break');
console.dir(timerButtons);

for (var t = 0; t < timerButtons.length; t++) {
    timerButtons[t].addEventListener('click', timerCtrl, true);
}

function timerCtrl(){
    console.log('in timerCtrl()');
    countDown = setInterval(counter, 1000);
}

//timer length controller:
var buttons = document.querySelectorAll('i');

for(var i = 0; i < 4; i++){
    buttons[i]
    .addEventListener('click', adjustVal, true);
}

function counter(){
    secs --;
    console.log('secs in counter()');
    console.log(secs);
    counterElm.textContent = String(secs);

    if(secs === 0){
        clearInterval(countDown);
    }
    // console.log(secs);
}

//how to lock out timer val buttons while running??
//display mins/secs on circle


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

//Animation Controller:
//how to start animation when timer starts
//right now it's running on page load
var radius = document.getElementById('fill')
    .animate([
        { r: 0 },
        { r: 95 }
        ],{
            duration: 1000,
            direction: 'alternate',
            iterations: 1
        });

