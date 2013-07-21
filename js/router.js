  /***********************************
   * Router
   *
   * routes for project details
  ************************************
  /                                  */

  var AppRouter = Backbone.Router.extend({
    routes: {
      "sequencer": "sequencer",
      "*actions": "defaultRoute"
      }
  });

  var app_router = new AppRouter;

  // everything's loaded
  $('#preloader').on('loaded', function(){
    $('#preloader').fadeOut(500);
  });

  // hide intro when we go sequencer
  app_router.on('route:sequencer', function() {
    $('#intro').fadeOut();
<<<<<<< HEAD
    $('#preloader').on('loaded', function(){
      $(this).fadeOut(500);
    });
=======
>>>>>>> ad51ccd04d05289234c83dc6ef0dbafbb2aa1503
  });

  app_router.on('route:defaultRoute', function() {
    $("#intro .tracks").html('');
    if (!$('#playpause').hasClass('paused')) {
      $('#playpause').trigger('tap');
    }

    // show the configured tracks
    _.each(CONFIG.TRACKS, function(track, idx) {
      $('#intro .tracks').append(
        '<a href="#sequencer" class="track-pick" data-track="' + idx + '">' +
        track.artist + ' - ' + track.title + '</a>');
    });

    // fade in
    $('#intro').fadeIn();
    $('#preloader').fadeIn();
  });

  Backbone.history.start();


