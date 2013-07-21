//
// starting point for the application
//
var track1 = new Track(0);
var sequencer = new Sequencer(track1);

$(function() {

  // change events
  sequencer.on('beat', function(phase, beat) {
    console.log('beat', phase, beat);
  });

  // play button
  $('#playpause').click(function() {
    $(this).hasClass('paused') ? sequencer.play() : sequencer.pause();
  });

});

