//
// starting point for the application
//
var track1 = new Track(0);
var sequencer = new Sequencer(track1);

$(function() {

  // change events
  sequencer.on('beat', function(phase, beat) {
    console.log('beat', phase, beat);
    $('#parts div').removeClass('current');
    $('#parts div[data-part="'+beat+'"]').addClass('current');
  });

  // play button
  $('#playpause').on('tap', function(){
    $(this).hasClass('paused') ? sequencer.play() : sequencer.pause();
  });

  // section switcher
  $('#sections > div').on('tap', function() {
    if (!$(this).hasClass('current')) {
      $('#sections .current').removeClass('current');
      $(this).addClass('current');
      sequencer.section($(this).data('section'));
    }
  });

});

