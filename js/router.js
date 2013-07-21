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
  });

  app_router.on('route:defaultRoute', function() {
    $("#intro .tracks").html('');

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


