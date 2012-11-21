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
  "bootstrap"
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
  
  var activeSoundModel;

  // Initialise Application
  var app = new Marionette.Application();
  var playlistsCollection = new PlaylistsCollection();


  if (playlistsCollection.length === 0) {
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
  };

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
  vent.on('playlist:create', function(playlist) {
    playlistsCollection.create(playlist, {
      success: function(model) {
        var alert = new AlertView({'message': '\'<strong>' + playlist.title + '</strong>\' succesfully created','type':'success'});
        Backbone.history.navigate("playlist/" + model.id, true);
      }
    });
  });


  vent.on('sound:stream', function(model) {
    
    SC.stream("/tracks/" + model.get('id'), function(sound) {
        vent.trigger('sound:stop');
        // Is this sound already playing
        if (!model.get('playing')) {
          // Setup event listener to trigger 1sec before end of track
          sound.onPosition(model.get('duration') - 1000, function() {
            // Trigger sound:finished application event
            vent.trigger("sound:finished");
            // Trigger playlist:next application event
            vent.trigger("playlist:next", model);
          });

          // Update favicon
          $('head link[rel=icon]').attr("href","/favicon-play.ico");

          // Play sound
          sound.play();

          // Set playing attribute to true
          model.set('playing', true);

          // Set Sound object
          model.set('sound', sound);

          // Set Active Sound Model
          activeSoundModel = model;
        }
      });
  });


  vent.on('sound:stop', function() {
    if (activeSoundModel) {
      $('head link[rel=icon]').attr("href","/favicon.ico");
      activeSoundModel.get('sound').stop();
      activeSoundModel.set('playing', false);
    }
  });

  vent.on('playlist:addsoundbyurl', function(options) {
    SC.get('/resolve', {url: options.url}, function(response) {
        // Response has errors?
        if (_.has(response, 'errors')) {
          // If so show user a notification
          var alert = new AlertView({message:'Ohhhhh Snaaaaaaap! There was a problem loading that sound.  Are you sure it was a Soundcloud URL?','type':'error'});
          return;
        }
        // Basic response validation
        if (_.has(response,'kind') && response.kind === 'track') {
          // We've got a track
          var sounds;
          response.playing = false;
          /**
           * Hacky stuff to work around Marionette/localStorage 
           * @todo refactor! 
           */
          sounds = options.model.get('sounds') || [];
          sounds.push(response);
          options.model.save({'sounds':sounds});
          
          // Trigger playlist:show application event
          vent.trigger('playlist:show', options.model);
        } else {
          /** @todo Handle Error */
        }
      });
  });

  /**
   * app:region:close:main application event listener
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.eventaggregator.md   
   */
  vent.on("app:region:close:main", function() {
    app.main.close();
  });

  /**
   * Show Sidebar Region
   * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.region.md#basic-use
   */
  app.sidebar.show(new PlaylistsView(viewOptions));

  /**
   * Initialise Soundcloud SDK
   * @see http://developers.soundcloud.com/docs/api/sdks#javascript
   */
  if (window.SC) {
    window.SC.initialize({
      client_id: '4fb5b0db1d4852e4b1487a0254a74b70'
    });
  } else {
    throw new Error("Playlistr: required dependency Soundcloud Javascipr SDK is missing");
  }

  return app;

});
