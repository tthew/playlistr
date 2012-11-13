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
  'models/playlist-model',
  // Plugins
  'localStorage'
], 

/**
 * Playlists Collection
 * @name    PlaylistsCollection
 * @class   PlaylistsCollection
 * @constructor
 * @return {Object} Backbone.Collection
 */
function(_, Backbone, PlaylistModel){
  'use strict';
  return Backbone.Collection.extend({
     /**
      * Sound Model
      * @type {Object}
      */      
      model: PlaylistModel,

      /**
       * local storage
       * @see https://github.com/jeromegn/Backbone.localStorage
       */
      localStorage: new Backbone.LocalStorage('plstr-playlists'),

      /**
       * Constructor
       * @memberOf PlaylistsCollection
       */
      initialize: function() {
        /**
         * Fetch collection from storage
         * @see https://github.com/jeromegn/Backbone.localStorage
         */
        this.fetch();
      }
    });
});

