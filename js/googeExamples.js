element.animate(
    {transform: 'rotate(360deg)'},
    {
      direction: 'alternate',
      duration: 1,
      iterations: 4
    });

// http://alancutter.github.io/web-animations-slides-lca-2014/#1

//More complex timing:

element.animate(
    {transform: 'rotate(360deg)'},
    {
      direction: 'alternate',
      duration: 1,
      iterations: Infinity,
      easing: 'ease-in-out',
      playbackRate: 2
    });

// Without the syntactic sugar
document.timeline.play(
  new Animation(
    element,
    new KeyframeAnimationEffect([{transform: 'rotate(360deg)'}]),
    {duration: 2}));

// Parallel animation grouping
document.timeline.play(new ParGroup([
  new Animation(parItem1, [{width: '0px'}, {width: '600px'}], 1),
  new Animation(parItem2, [{width: '0px'}, {width: '800px'}], 1),
  new Animation(parItem3, [{width: '0px'}, {width: '200px'}], 1),
]));

// Sequential animation grouping
document.timeline.play(new SeqGroup([
  new Animation(seqItem1, [{width: '0px'}, {width: '300px'}], 1),
  new Animation(seqItem2, [{width: '0px'}, {width: '400px'}], 1),
  new Animation(seqItem3, [{width: '0px'}, {width: '100px'}], 1),
]));


// Nested grouped animations
document.timeline.play(new SeqGroup([
  new Animation(outerSeqItemFirst, [{width: '0px'}, {width: '300px'}], 1),
  new ParGroup([
    new Animation(innerParItem1, [{width: '0px'}, {width: '300px'}], 1),
    new Animation(innerParItem2, [{width: '0px'}, {width: '380px'}], 1),
    new Animation(innerParItem3, [{width: '0px'}, {width: '100px'}], 1),
  ]),
  new Animation(outerSeqItemLast, [{width: '0px'}, {width: '100px'}], 1)
]));

// Path animations
var svgPathData = 'M 100 200' +
                  'C 200 100 300   0 400 100' +
                  'C 500 200 600 300 700 200' +
                  'C 800 100 900 100 900 100';
var pathAnimation = new Animation(
    chromeLogo,
    new PathAnimationEffect(svgPathData, 'auto-rotate'),
    {
      duration: 1,
      direction: 'alternate',
      easing: 'ease-in-out',
      iterations: Infinity,
    });
document.timeline.play(pathAnimation);

// Playback control
var player = document.timeline.play(pathAnimation);
player.paused = true;
seekSlide.onmousemove = function(event) {
  player.currentTime = (event.clientX - seekSlide.offsetLeft) / seekSlide.clientWidth;
};

// Custom animation effects
function customAnimationEffect(timeFraction, iteration, target) {
  output.textContent = 'timeFraction: ' + timeFraction.toFixed(2);
                       'iteration: ' + iteration + '\n' +
}
document.timeline.play(
  new Animation(
    null,
    customAnimationEffect,
    { duration: 2,            direction: 'alternate',
      easing: 'ease-in-out',  iterations: Infinity }));

// Timing Model
// Timing inputs
dictionary TimingInput {
    double                             delay = 0;
    double                             endDelay = 0;
    FillMode                           fill = "auto";
    double                             iterationStart = 0.0;
    unrestricted double                iterations = 1.0;
    (unrestricted double or DOMString) duration = "auto";
    double                             playbackRate = 1.0;
    PlaybackDirection                  direction = "normal";
    DOMString                          easing = "linear";
    EasingTimesInput                   easingTimes = "distribute";
};