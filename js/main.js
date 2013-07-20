var phase  = 0;
var seq    = 0;
var sequence = [  
  [0,1,2,3,4,5,6,7],
  [0,0,2,2,3,3,4,4],
  [7,6,5,4,3,2,1,0],
  [0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2]  
];
var go;

//
// starting point for the application
//
var track1 = new Track(0);

track1.ready(function() {

  console.log('track ready', track1.profile, track1.analysis);

  var BPM          = track1.tempo();
  var beatInterval = 1000 / (BPM/60);
  var beatInfo     = [];
  
  console.log(beatInfo);

  var sound = new Howl({
    urls: [track1.file],
    sprite: {
      one   : track1.beat(1,0),
      two   : track1.beat(1,1),
      three : track1.beat(1,2),
      four  : track1.beat(1,3),
      five  : track1.beat(1,4),
      six   : track1.beat(1,5),
      seven : track1.beat(1,6),
      eight : track1.beat(1,7)
    }
  });

  $('button').click(function(){
    seq += 1;
    console.log(seq);
    $(this).html(seq);
    if (seq > sequence.length) seq = 0;
  });

  function playSlice() {
    var num = Math.floor(Math.random() * 8);
    var sprite = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
    var sliceToPlay;

    sliceToPlay = sequence[seq][phase];
    sound.play(sprite[sliceToPlay]);
    loop();
    phase += 1;
    if (phase > 7) phase = 0;
  }

  loop = function() {
    setTimeout(function(){
      playSlice();
    }, track1.beat(1, phase)[1] );
  }

  playSlice();
});

