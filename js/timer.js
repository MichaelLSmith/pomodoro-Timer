function timeCalc(t){

    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );

    return {
        minutes: minutes,
        seconds: seconds,
    }
}


function timerInit(id, countInMilliseconds){
    var elm = document.getElementById(id);
    var timer = setInterval(function(){
        countInMilliseconds -= 1000;
        console.log(countInMilliseconds);
        var t = timeCalc(countInMilliseconds);
        console.log(t);
        elm.innerHTML = '<div>'+t.minutes+'</div>'
                      + '<div>'+t.seconds+'</div>';
    if(t.m <= 0){ clearInterval(timer);}

    },1000);
}

// timerInit('clock', 120000);