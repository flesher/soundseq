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
    $(this).hasClass('paused') ? sequencer.play() : sequencer.pause();
    $(this).toggleClass('paused');
  });

  $('#touch, #gyro').on('tap', function(){
    $('#touch, #gyro').removeClass('current');
    $(this).addClass('current');
  });

  $('#gyro').on('tap', function(){
    $('#parts div').removeClass('queued');
  });

  $('#parts div').on('tap', function(){
    if ($('#touch').hasClass('current')) {
      //manual event fire
      $('#parts div').removeClass('queued');
      $(this).addClass('queued');
    };
  });


  $('#sections div').on('tap', function(){
    
      //manual event fire
      $('#sections div').removeClass('queued');
      $(this).addClass('queued');
  });



}) // doc ready