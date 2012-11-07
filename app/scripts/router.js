define([
  // Application.
  "app",
    // Event Aggregator
  "vent",
  // Views
  "views/playlists-view"
],

function(app, vent, PlaylistsView, PlaylistView) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "": "index",
      "add_sound/*uri": "add_sound"
    },

    index: function() {
      console.log(this);
    },

    add_sound: function(uri) {
      vent.trigger("")
      console.log(uri);

      $("#plstr-bookmarklet-helper-modal input[name=uri]").val(uri);
      $("#plstr-bookmarklet-helper-modal").modal("show");
    }
  });

  return Router;

});
