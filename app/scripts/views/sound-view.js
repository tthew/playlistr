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
    },

    /**
     * Click event handler
     * @memberOf Soundview
     */
    click: function() {
      // Stream sound
      vent.trigger("sound:stream", this.model);
    }
  });
});
