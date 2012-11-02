require([
  
  // Application.
  "app",


  // Main Router.
  "router",
  "views/playlists-view",
  "views/playlist-list-item-view"
],

function(Playlistr, Router) {

  Playlistr.start();

  Playlistr.router = new Router();
  Backbone.history.start();

});
