define([
  // Application.
  "app",
  // Playlists View
  "views/playlists-view",
  // "views/playlists-view",  
],

function(app, PlaylistsView, PlaylistView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index"
    },

    index: function() {


    }
  });

  return Router;

});
