var fillChange = document.getElementById('circle');
var test = document.getElementById('test');
console.dir(test);
// console.dir(fillChange);

var styleLook = window.getComputedStyle(fillChange);

console.dir(styleLook);

// fillChange.setAttribute('fill', 'blue');


var mask = document.getElementById('mask2');

// console.dir(mask);

var animation = document.getElementById('circle')

    .animate([
            { fill: 'blue' },
            { fill: 'yellow' }
        ], {
            duration: 2000,
            direction: 'alternate',
            iterations: Infinity
        });

console.dir(animation);


var radius = document.getElementById('fill')
    .animate([
        { r: 0 },
        { r: 25 },
        { r: 37 }
        ],{
            duration: 2000,
            direction: 'alternate',
            iterations: Infinity
        });

// animation.style.r = 35;





