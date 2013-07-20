//
// starting point for the application
//
var track1 = new Track(0);

track1.ready(function() {

  console.log('track ready', track1.profile, track1.analysis);

  var phase        = 0;
  var steps        = 8;
  var BPM          = 120;
  var beatInterval = 1000 / (BPM/60);

  var sound = new Howl({
    urls: [track1.file],
    sprite: {
      one   : track1.beat(1, 0),
      two   : track1.beat(1, 1),
      three : track1.beat(1, 2),
      four  : track1.beat(1, 3),
      five  : track1.beat(1, 4),
      six   : track1.beat(1, 5),
      seven : track1.beat(1, 6),
      eight : track1.beat(1, 7)
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

});
