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
  // Libraries
  'lodash',
  'backbone',
  'marionette',
  // Event Aggregator
  'vent',
  // Models
  'models/playlist-model',
  'models/sound-model',    
  // Views
  'views/sound-view',
  'views/alert-view',
  // Collections
  'collections/sounds-collection',
  // Templates
  'text!templates/playlist-detail.html'
], 
/**
 * Playlist Composite (Detail) View
 * @name    PlaylistDetailView
 * @class   PlaylistDetailView
 * @constructor
 * @return {Object} Marionette.CompositeView
 */
function(_, Backbone, Marionette, vent, Playlist, Sound, SoundView, AlertView, Sounds, tpl){
  'use strict';
  return Marionette.CompositeView.extend({
    /**
     * Template
     * @type {Mixed}
     * @memberOf PlaylistDetailView
     */
  	template: _.template(tpl),

    /**
     * Item View 
     * @type {Mixed}
     * @memberOf  PlaylistDetailView
     * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md
     */
    itemView: SoundView,

    /**
     * Item View Container
     * @type {Mixed}
     * @memberOf  PlaylistDetailView
     * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md
     */
    itemViewContainer: 'tbody',

    /**
     * DOM event listeners
     * @type {Mixed}
     * @memberOf PlaylistDetailView
     */
    events: {
      'click .stop': 'stop',
      'click .pause': 'pause',
      'click .play': 'play',
      'submit form#plstr-playlist-details': 'updateDetails',
      'submit form#plstr-form-add-sound': 'addSoundToPlaylist'
    },

    /**
     * Constructor
     * @memberOf PlaylistDetailView
     */
    initialize: function() {
      var self = this;

      self.model.on('change', self.render)
      self.collection.on('change', self.render);

      vent.on('playlist:next', function(previousSound) {
        // Does next track exist?
        if (_.isObject(self.collection.models[_.indexOf(self.collection.models, previousSound) + 1])) {
          vent.trigger('sound:stop');
          vent.trigger('sound:play', self.collection.models[_.indexOf(self.collection.models, previousSound) + 1]);
        }
      });

      /* playlist:play application event listener */
      vent.on('playlist:play', function() {
        vent.trigger('sound:stop');
        vent.trigger('sound:play', self.collection.models[0]);
      });

    },

    /**
     * Add sound to Playlist event handler
     * @param {Object} e  Event
     * @memberOf PlaylistDetailView
     * @todo refactor, method is too long
     */
    addSoundToPlaylist: function(e) {
      var self = this,
          url;
      
      e.preventDefault();
      url = this.$('form#plstr-form-add-sound input[name=uri]').val();

      // Attempt to resolve API endpoint from URI
      SC.get('/resolve', {url: url}, function(response) {
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
           * @todo refactor this! 
           */
          sounds = self.model.get('sounds') || [];
          sounds.push(response)
          self.model.save({'sounds':sounds});
          self.collection = new Sounds(self.model.get('sounds'));
          // Trigger playlist:show application event
          vent.trigger('playlist:show', self.model);
        } else {
          /** @todo Handle Error */
        }
      });
    },

    /**
     * Playlist details update handler
     * @param {Object} e Event
     * @memberOf PlaylistDetailView
     * @todo Handle save error
     */
    updateDetails: function(e) {
      e.preventDefault();
      this.model.save(
        {
          title: this.$('#plstr-playlist-details input[name=title]').val(),
          description: this.$('#plstr-playlist-details textarea[name=description]').val()
        },
        {
          success: function() {
            var alert = new AlertView({message: 'Playlist details saved', type:'success'});
          },
          error: function() {
           /** @todo Handle Error */
          }
        }
      );
    },

    /**
     * Trigger sound:stop application event
     * @memberOf PlaylistDetailView
     */
    stop: function() {
      vent.trigger('sound:stop');
    },

    /**
     * Trigger sound:pause application event
     * @memberOf PlaylistDetailView
     */
    pause: function() {
      vent.trigger('sound:pause');
    },

    /**
     * Trigger sound:play application event
     * @memberOf PlaylistDetailView
     */
    play: function() {
      vent.trigger('sound:play', this.collection.models[0]);
    }
  });
});
