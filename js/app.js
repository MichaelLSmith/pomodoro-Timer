var baseCir = document.getElementById('circleBase');
// console.dir(baseCir);

//timer code:
var count = 1.5;
var countTxt = document.getElementById('count').textContent;
// console.log(countTxt);
var countNum = parseInt(countTxt);
// console.log(countNum);

//convert minutes to seconds
var secs = count * 60;
var dur = secs * 1000;
// console.log(dur);

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

//buttons
var buttons = document.querySelectorAll('i');

// console.log(buttons);

for(var i = 0; i < 4; i++){
    buttons[i]
    .addEventListener('click', adjustVal, true);
}

function adjustVal(evt){
    console.dir(evt);
    if(evt.target.id === 'workAdd'){
        console.log('if workAdd');
        countNum += 1;
        console.log(countNum);
    }
    if(evt.target.id === 'workSubtract'){
        countNum -= 1;
    }

    if(evt.target.id === 'breakAdd'){

    }

    if(evt.target.id === 'breakSubtract'){

    }
    countTxt = String(countNum);
    var setNum = document.getElementById('count');
    setNum.innerHTML = '37';
    console.dir(document.getElementById('count'));

}

//circle animation:
var radius = document.getElementById('fill')
    .animate([
        { r: 0 },
        { r: 95 }
        ],{
            duration: 2000,
            direction: 'alternate',
            iterations: Infinity
        });

