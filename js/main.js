//
// starting point for the application
//
var track1 = new Track(4);
var sequencer = new Sequencer(track1);

$(function() {

  // change events
  sequencer.on('beat', function(phase, beat) {
    $('#parts .part, #sections .section .part.current').removeClass('current');
    $('#parts .part[data-part="'+beat+'"]').addClass('current');
    $('#sections .section.queued').addClass('current').removeClass('queued');
    $('#parts .part[data-part="'+beat+'"],#sections .section.current .part[data-part="'+beat+'"]').addClass('current flash');
    $('#parts .part.queued').removeClass('queued');
    setTimeout(function(){
      $('#parts .part[data-part="'+beat+'"],#sections .section.current .part[data-part="'+beat+'"]').removeClass('flash')
    }, 100);
    $('.button.sequence.current .part[data-part="'+phase+'"]').attr('data-position', beat);
    $('.button.sequence.current .part.current').removeClass('current');
    $('.button.sequence.current .part[data-part="'+phase+'"]').addClass('current');
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
      $('#sections .current, #sections .section').removeClass('current');
      $(this).addClass('queued');
      sequencer.section($(this).data('section'));
    }
  });

  // sequence switchers/reset
  $('#reset').on('tap', function() {
    sequencer.reset();
  });

});

