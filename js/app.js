//timer Model

//timer variables:
var counterElm = document.getElementById('count');
var count = parseInt(counterElm.textContent);
console.log(count);

//convert minutes to seconds
var secs = count * 60;
//convert seconds to milliseconds > dur var controls how long the animation runs > tied directly to time of counter.
var dur = secs * 1000;
// console.log(dur);

//timer controls
//how to manually start counter??
// var countDown = setInterval(counter, 1000);

function counter(){
    secs --;
    console.log('secs in counter()');
    console.log(secs);
    if(secs === 0){
        clearInterval(countDown);
    }
    // console.log(secs);
}

//button controller:
var buttons = document.querySelectorAll('i');

for(var i = 0; i < 4; i++){
    buttons[i]
    .addEventListener('click', adjustVal, true);
}

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
}

//Animation Controller:
var radius = document.getElementById('fill')
    .animate([
        { r: 0 },
        { r: 95 }
        ],{
            duration: 2000,
            direction: 'alternate',
            iterations: Infinity
        });

