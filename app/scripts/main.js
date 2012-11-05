require([
  
  // Application.
  "app",


  // Main Router.
  "router",
  "views/application-view",
  "views/playlists-view",
  "views/playlist-list-item-view"
],

function(Playlistr, Router, ApplicationView) {

  Playlistr.start();

  Playlistr.router = new Router();
  Backbone.history.start();

  var view = new ApplicationView();

  

});
