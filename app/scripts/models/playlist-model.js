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
    // Collections,
    'collections/sounds-collection'
], 
/**
 * Playlists Model
 * @name    PlaylistModel
 * @class   PlaylistModel
 * @constructor
 * @return {Object} Backbone.Model
 */
function(_, Backbone, Sounds){
    'use strict';   
    return Backbone.Model.extend({
        defaults: {
            'title': '',
            'description': '',
            'sounds': new Sounds()
        }
    });
});
