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
	'lodash',
  	'backbone',
    'vent',
  	'models/playlist-model',
    'views/alert-view',
  	'localStorage'

], 

/**
 * Playlists Collection
 * @name    PlaylistsCollection
 * @class   PlaylistsCollection
 * @constructor
 */
function(_, Backbone, Vent, PlaylistModel, AlertView){
 	return Backbone.Collection.extend({
  		model: PlaylistModel,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
  			var self = this;
        this.fetch();
  		}
  	});
});

