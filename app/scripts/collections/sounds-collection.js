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
  // Event Aggregator
  'vent',
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
 function(_, Backbone, Vent, Sound){
 	return Backbone.Collection.extend({
  		model: Sound,
  		localStorage: new Backbone.LocalStorage('plstr-playlists'),

  		initialize: function() {
        var self = this;
        this.fetch();
  		}
  	});
});

