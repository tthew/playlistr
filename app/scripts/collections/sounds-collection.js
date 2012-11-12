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
  // Models
  'models/sound-model',
  // Plugins
  'localStorage'
],
/**
 * Sounds Collection
 * @name    Sounds
 * @class   Sounds
 * @constructor
 * @return {Object} Backbone.Colletion
 */
 function(_, Backbone, Sound){
  'use strict';
  return Backbone.Collection.extend({
     /**
      * Sound Model
      * @type {Object}
      */
      model: Sound,

      /**
       * local storage
       * @see https://github.com/jeromegn/Backbone.localStorage
       */
      localStorage: new Backbone.LocalStorage('plstr-playlists'),

      /**
       * Constructor
       * @memberOf Sounds
       */
      initialize: function() {
        var self = this;

        /**
         * Fetch collection from storage
         * @see https://github.com/jeromegn/Backbone.localStorage
         */
        this.fetch();
      }
    });
});

