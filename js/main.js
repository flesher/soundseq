(function(){
  var phase     = 0;
  var seq    = 0;
  var sequence = [  
    [0,1,2,3,4,5,6,7],
    [0,0,2,2,3,3,4,4],
    [7,6,5,4,3,2,1,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [2,2,2,2,2,2,2,2]  
  ]

  //
  // starting point for the application
  //
  var track1 = new Track(0);

  track1.ready(function() {

    console.log('track ready', track1.profile, track1.analysis);

    var BPM          = 120;
    var beatInterval = 1000 / (BPM/60);

    var sound = new Howl({
      urls: [track1.file],
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

    $('button').click(function(){
      seq += 1;
      console.log(seq);
      $(this).html(seq);
      if (seq > sequence.length) seq = 0;
    });

    setInterval( function() {
      var num = Math.floor(Math.random() * 8);
      var sprite = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
      var sliceToPlay;

      sliceToPlay = sequence[seq][phase];

      sound.play(sprite[sliceToPlay]);

      phase += 1;
      if (phase > 7) phase = 0;

    }, beatInterval * 2);

  });

})();
