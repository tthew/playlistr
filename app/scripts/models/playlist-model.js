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
	'backbone'
], 
/**
 * Playlists Model
 * @name    PlaylistModel
 * @class   PlaylistModel
 * @constructor
 * @return {Object} Backbone.Model
 */
function(_, Backbone){
	return Backbone.Model.extend({
		defaults: {
			'title': '',
			'description': '',
			'sounds': ''
		}
	});
});
