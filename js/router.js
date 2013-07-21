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

  app_router.on('route:sequencer', function() {
    $('#intro').fadeOut();

    $('#preloader').on('loaded', function(){
      $(this).fadeOut(500);
    });
  });

  app_router.on('route:defaultRoute', function() {
    $("#intro").html('')
    _.each(CONFIG.TRACKS, function(track, idx) {
      $('#intro').append(
        '<a href="#sequencer" class="track-pick" data-track="' + idx + '">' +
        track.artist + ' - ' + track.title + '</a>');
    });
    $('#intro').fadeIn();
  });

  Backbone.history.start();


