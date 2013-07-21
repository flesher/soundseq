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

  $('#parts .part').on('tap', function(){
    //if ($('#touch').hasClass('current')) {
      //manual event fire
      $('#parts div').removeClass('queued');
      $(this).addClass('queued');
    //};
  });


  $('#sections div').on('tap', function(){

      //manual event fire
      $('#sections div').removeClass('queued');
      $(this).addClass('queued');
  });

  $('#seq1, #seq2, #seq3').on('tap', function(){
    $('#seq1, #seq2, #seq3').removeClass('current');
    $(this).addClass('current');
  });

  $('#reset').on('tap', function(){
    $(this).addClass('current');
    $('#notice').text('Selected Sequence Reset').fadeIn();
    setTimeout(function(){
      $('#reset').removeClass('current');
    }, 200);

    setTimeout(function(){
      $('#notice').fadeOut();
    }, 900);
  });




  $('#parts div').on('tap', function(){
      var val = parseInt($(this).attr('data-part'));
      sequencer.replace(val);


    // var now = sequencer.phase;
    // var val = $(this).attr('data-part');

    // for (var i = 0; sequencer.sequence.length)

    // console.log (now + ' ' + val);

  })



}) // doc ready
