//
// starting point for the application
//
var track1 = new Track(0);
var sequencer = new Sequencer(track1);

$(function() {

  // change events
  sequencer.on('beat', function(phase, beat) {
    console.log('beat', phase, beat);
    $('#parts .part, #sections .section.current .part').removeClass('current');
    $('#parts .part[data-part="'+beat+'"],#sections .section.current .part[data-part="'+beat+'"]').addClass('current');
    $('#parts .part, #sections .section').removeClass('queued');
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

