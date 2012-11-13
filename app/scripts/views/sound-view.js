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
  'models/sound-model',
  // Templates
  'text!templates/sound-item.html'
], 
/**
 * Sound Item View
 * @name    SoundView
 * @class   SoundView
 * @constructor
 * @return {Object} Marionette.ItemView
 * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md
 */
function(_, Backbone, Marionette, vent, Sound, tpl){
  'use strict';
  return Marionette.ItemView.extend({
    /**
     * Tag name
     * @type {String}
     * @memberOf SoundView
     */    
    tagName: 'tr',

    /**
     * Template
     * @type {Mixed}
     * @memberOf SoundView
     */    
    template: _.template(tpl),

    /**
     * DOM event listeners
     * @type {Mixed}
     * @memberOf SoundView
     */
    events: {
      "click": "click"
    },

    /**
     * Constructor
     * @memberOf Soundview
     */
    initialize: function() {
      var self = this;
      this.model.on('change', this.render, this);

      vent.on("sound:play", function(model) {

        if (model.cid == self.model.cid) {
          self.stopSound();
          self.streamSound();
        }
      });

      vent.bind("sound:finished", function() {
        self.model.set("playing", false);
      });

      vent.bind("sound:stop", function() {
        self.stopSound();
      });
    },

    /**
     * Stop sound from playing
     * @memberOf SoundView
     */
    stopSound: function() {
      if (this.sound) {
        this.sound.stop();
        this.model.set('playing', false);  
      }
    },

    /**
     * Stream Sound
     * @memberOf SoundView
     * @todo better error handling
     */
    streamSound: function() {
      var self = this;

      // Initialise stream
      SC.stream("/tracks/" + this.model.get('id'), function(sound) {
        self.sound = sound;
        // Is this sound already playing
        if (!self.model.get('playing')) {
          // Setup event listener to trigger 1sec before end of track
          sound.onPosition(self.model.get('duration') - 1000, function() {
            // Trigger sound:finished application event
            vent.trigger("sound:finished");
            // Trigger playlist:next application event
            vent.trigger("playlist:next", self.model);
          });

          // Play sound
          sound.play();

          // Set playing attribute to true
          self.model.set('playing', true);
        }
      });
    },

    /**
     * Click event handler
     * @memberOf Soundview
     */
    click: function() {
      var self = this;

      // Trigger sound:stop application event
      vent.trigger("sound:stop");

      // Stream sound
      self.streamSound();
    }
  });
});
