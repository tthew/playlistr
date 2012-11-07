/**
 * Playlistr 
 *
 * A Soundcloud playlisting application
 *
 * @package Playlistr
 * @author Matt Richards
 * @copyright Copyright (c) 2012, Matt Richards
 * @licence http://opensource.org/licenses/MIT
 * @link http://lucidmoon.co.uk
 */

define([
  // Libraries.
  "jquery",
  "lodash",
  "marionette",
  // Event Aggregator
  "vent",
  // App Router
  "router",
  // Collections
  "collections/playlists-collection",
  "collections/sounds-collection",  
  // Controllers
  "controllers/application-controller",
  // Views
  "views/playlists-view",
  "views/playlist-detail-view",
  "views/alert-view",
  // Plugins.
  "../components/bootstrap-js/bootstrap.js"
],
/**
 * Application
 * @name    App
 * @class   App
 * @constructor
 * @return {Object} Marionette.Application
 * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md
 */
function($, _, Marionette, vent, Router, PlaylistsCollection, SoundsCollection, ApplicationController, PlaylistsView, PlaylistDetailView, AlertView) {
  'use strict';
  // Initialise Application
  var app = new Marionette.Application();
  var playlistsCollection = new PlaylistsCollection();

  if (playlistsCollection.length == 0) {
    $("#plstr-new-playlist-modal").modal("show");
  }
  
  /**
   * Add regions to application
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md
   */
  app.addRegions({
    nav: '#plstr-nav',
    sidebar: '#plstr-sidebar',
    main: '#plstr-main'
  });

  /**
   * View options
   * @type {Object}
   */
  var viewOptions = {
    collection: playlistsCollection
  }

  /**
   * Set up application initializers
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#adding-initializers
   */
  app.addInitializer(function(options) {
    new Router({
      controller: ApplicationController
    });
  });

  /**
   * App post-initialisation event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.application.md#application-event
   */
  app.on("initialize:after", function() {
    Backbone.history.start();
  });

  /**
   * playlist:show application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  vent.on("playlist:show", function(playlist) {
    app.main.show(new PlaylistDetailView({
      model: playlist,
      collection: new SoundsCollection(playlist.get('sounds') || [])
    }));
  });

  /**
   * playlist:create application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  vent.bind('playlist:create', function(playlist) {
    playlistsCollection.create(playlist, {
      success: function(model) {
        var alert = new AlertView({'message': '\'<strong>' + playlist.title + '</strong>\' succesfully created','type':'success'});
        Backbone.history.navigate("playlist/" + model.id, true);
      }
    });
  });

  /**
   * app:region:close:main application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  vent.on("app:region:close:main", function() {
    app.main.close();
  })

  /**
   * Show Sidebar Region
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md#basic-use
   */
  app.sidebar.show(new PlaylistsView(viewOptions));

  return app;

});
