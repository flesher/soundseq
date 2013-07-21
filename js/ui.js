$(document).ready(function(){

  var windowHeight, navHeight, footerHeight, partsHeight, partHeight;

  
  //keyboard shortcuts


  // part shortcuts

  $(document).bind('keypress', 'space',function (evt){
    playpause();
  });

  $(document).bind('keypress', 'a',function (evt){
    if (sequencer.track){
      sequencer.replace(0);
      $('#parts .part[data-part="0"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 's',function (evt){
    if (sequencer.track){
      sequencer.replace(1);
      $('#parts .part[data-part="1"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'd',function (evt){
    if (sequencer.track){
      sequencer.replace(2);
      $('#parts .part[data-part="2"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'f',function (evt){
    if (sequencer.track){
      sequencer.replace(3);
      $('#parts .part[data-part="3"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'g',function (evt){
    if (sequencer.track){
      sequencer.replace(4);
      $('#parts .part[data-part="4"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'h',function (evt){
    if (sequencer.track){
      sequencer.replace(5);
      $('#parts .part[data-part="5"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'j',function (evt){
    if (sequencer.track){
      sequencer.replace(6);
      $('#parts .part[data-part="6"]').addClass('queued');
    }
  });

  $(document).bind('keypress', 'k',function (evt){
    if (sequencer.track){
      sequencer.replace(7);
      $('#parts .part[data-part="7"]').addClass('queued');
    }
  });

  
  // section shortcuts

  $(document).bind('keypress', 'z',function (evt){
    if (sequencer.track){
      sequencer.section(0);
      $('#sections .section[data-section="0"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'x',function (evt){
    if (sequencer.track){
      sequencer.section(1);
      $('#sections .section[data-section="1"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'c',function (evt){
    if (sequencer.track){
      sequencer.section(2);
      $('#sections .section[data-section="2"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'v',function (evt){
    if (sequencer.track){
      sequencer.section(3);
      $('#sections .section[data-section="3"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'b',function (evt){
    if (sequencer.track){
      sequencer.section(4);
      $('#sections .section[data-section="4"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'n',function (evt){
    if (sequencer.track){
      sequencer.section(5);
      $('#sections .section[data-section="5"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', 'm',function (evt){
    if (sequencer.track){
      sequencer.section(6);
      $('#sections .section[data-section="6"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });

  $(document).bind('keypress', '<',function (evt){
    if (sequencer.track){
      sequencer.section(7);
      $('#sections .section[data-section="7"]').addClass('queued');
      $('#sections .current, #sections .section').removeClass('current');
    }
  });


  // utility shortcuts

  $(document).bind('keypress', 'r',function (evt){
    if (sequencer.track){
      $('#record').toggleClass('recording');
    }
  });

  $(document).bind('keypress', '1',function (evt){
    if (sequencer.track){
      $('.sequence .part').removeClass('current');
      $('#seq1, #seq2, #seq3').removeClass('current');
      $('#seq1').addClass('current');
      sequencer.sequence(0);
    }
  });

  $(document).bind('keypress', '2',function (evt){
    if (sequencer.track){
      $('.sequence .part').removeClass('current');
      $('#seq1, #seq2, #seq3').removeClass('current');
      $('#seq2').addClass('current');
      sequencer.sequence(1);
    }
  });

  $(document).bind('keypress', '3',function (evt){
    if (sequencer.track){
      $('.sequence .part').removeClass('current');
      $('#seq1, #seq2, #seq3').removeClass('current');
      $('#seq3').addClass('current');
      sequencer.sequence(2);
    }
  });



  // Init UI

  function initUI(){
    windowHeight = $(window).height();
    windowWidth = $(window).width();
    navHeight = $('nav#primary').height();
    footerHeight = $('section#sections').height();

    partsHeight = windowHeight - navHeight - footerHeight - 6;
    $('#parts').height(partsHeight +'px');
    $('#intro').height(windowHeight + 'px');
    $('#preloader').height(windowHeight + 'px');
    $('#overlay').height(windowHeight + 'px');
  }

  initUI();

  $(window).resize(function() {
    initUI();
  });

  function playpause(){
    $('#playpause').hasClass('paused') ? sequencer.play() : sequencer.pause();
    $('#playpause').toggleClass('paused');
  }

  $('#playpause').on('tap', function(){
    playpause();
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
    $('.sequence .part').removeClass('current');
    $('#seq1, #seq2, #seq3').removeClass('current');
    $(this).addClass('current');
    var tappedSequenceNum = $(this).attr('data-seqNum');
    sequencer.sequence(tappedSequenceNum);
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

  $('#record').on('tap', function(){
    $(this).toggleClass('recording');
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
