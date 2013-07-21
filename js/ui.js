$(document).ready(function(){

  var windowHeight, navHeight, footerHeight, partHeight;

  function initUI(){
    windowHeight = $(window).height();
    navHeight = $('nav#primary').height();
    footerHeight = $('section#sections').height();
    partHeight = windowHeight - navHeight - footerHeight;
    $('#parts').height(partHeight +'px');
  }

  initUI();
  
  $(window).resize(function() {
    initUI();     
  });

  $('#playpause').on('tap', function(){
    $(this).toggleClass('paused');
    //sound.toggle;
  });

  $('#touch, #gyro').on('tap', function(){
    $('#touch, #gyro').removeClass('current');
    $(this).addClass('current');
  })




  $('#parts div').on('tap', function(){
      var val = parseInt($(this).attr('data-part'));
      sequencer.update(val);


    // var now = sequencer.phase;
    // var val = $(this).attr('data-part');

    // for (var i = 0; sequencer.sequence.length)

    // console.log (now + ' ' + val);

  })



}) // doc ready