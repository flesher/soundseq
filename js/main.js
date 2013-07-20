(function(){
  var phase        = 0;
  var steps        = 8;
  var BPM          = 120;
  var beatInterval = 1000 / (BPM/60);

  var sound = new Howl({
    urls: ['music/pl-loop.mp3'],
    sprite: {
      one   : [0, beatInterval * 2],
      two   : [beatInterval * 2, beatInterval * 2],
      three : [beatInterval * 4, beatInterval * 2],
      four  : [beatInterval * 6, beatInterval * 2],
      five  : [beatInterval * 8, beatInterval * 2],
      six   : [beatInterval * 10, beatInterval * 2],
      seven : [beatInterval * 12, beatInterval * 2],
      eight : [beatInterval * 14, beatInterval * 2]
    }
  });

  setInterval(function(){
    var num = Math.floor(Math.random() * 8);
    var sprite = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    phase += 1;
    if (phase > 7) phase = 0;

    console.log(phase);
    sound.play(sprite[phase]);
  }, beatInterval * 2);

})();