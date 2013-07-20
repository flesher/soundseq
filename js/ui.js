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

  $('#playpause').click(function(){
    $(this).toggleClass('paused');
    //sound.toggle;
  });

  $('#touch, #gyro').click(function(){
    $('#touch, #gyro').removeClass('current');
    $(this).addClass('current');
  })



}) // doc ready