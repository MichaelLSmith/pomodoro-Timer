var fillChange = document.getElementById('circle');

// console.dir(fillChange);

// var styleLook = window.getComputedStyle(fillChange);

// console.dir(styleLook);

// fillChange.setAttribute('fill', 'blue');

// var animation = document.getElementById('circle')

//     .animate([
//             { fill: 'blue' },
//             { fill: 'yellow' }
//         ], {
//             duration: 2000,
//             direction: 'alternate',
//             iterations: 3
//         });

// console.dir(animation);

var radElm = document.getElementById('fill')
// console.dir(radElm);

// console.dir(window.getComputedStyle(radElm));

var baseCir = document.getElementById('circleBase');
// console.dir(baseCir);

var radius = document.getElementById('fill')
    .animate([
        { r: 0 },
        { r: 25 },
        { r: 36 }
        ],{
            duration: 2000,
            direction: 'alternate',
            iterations: 3
        });


console.dir(radius);

// animation.style.r = 35;





