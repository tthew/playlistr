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
 	return Backbone.Collection.extend({
  		model: PlaylistModel,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
  			var self = this;
        this.fetch();
  		}
  	});
});

