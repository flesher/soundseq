//
// starting point for the application
//
var track1 = new Track(3);
var sequencer = new Sequencer(track1);

$(function() {

  // change events
  sequencer.on('beat', function(phase, beat) {
    $('#parts .part, #sections .section .part').removeClass('current');
    $('#parts .part[data-part="'+beat+'"]').addClass('current');
    $('#parts .part[data-part="'+beat+'"],#sections .section.current .part[data-part="'+beat+'"]').addClass('current');
    $('#parts .part.queued, #sections .section.queued').removeClass('queued');
  });

  // play button
  $('#playpause').on('tap', function(){
    $(this).hasClass('paused') ? sequencer.play() : sequencer.pause();
    $('#parts .part, #sections .section.current .part').removeClass('current');
    $('#parts .part, #sections .section').removeClass('queued');
  });

  // section switcher
  $('#sections > .section').on('tap', function() {
    if (!$(this).hasClass('current')) {
      $('#sections .current').removeClass('current');
      $(this).addClass('current');
      sequencer.section($(this).data('section'));
    }
  });

  // sequence switchers/reset
  $('#reset').on('tap', function() {
    sequencer.reset();
  });
  $('#seq1').on('tap', function() {
    sequencer.sequence(0);
  });
  $('#seq2').on('tap', function() {
    sequencer.sequence(1);
  });
  $('#seq3').on('tap', function() {
    sequencer.sequence(2);
  });

});

