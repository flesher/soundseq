//
// starting point for the application
//

// when track-meta and audio-file are loaded

if(window.location.hash) {
  window.location.hash="";
}

var sequencer = new Sequencer();
sequencer.on('ready', function() {
  $('#preloader').trigger('loaded');
});

$(function() {

  // load a track
  $('#intro').on('tap', 'a.track-pick', function(e) {
    sequencer.track($(this).data('track'));
  });
  $('#fileupload').on('uploaded', function(e, track) {
    console.log("UPLOADED", e, track);
    sequencer.track(track);
  });

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

  // record button
  $('#record').on('tap', function() {
    sequencer.record();
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

