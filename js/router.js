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
    $('#intro').fadeIn();
  });

  Backbone.history.start();


