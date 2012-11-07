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
  // Views
  'views/playlist-list-item-view'
], 
/**
 * Playlists Composite View
 * @name    PlaylistsView
 * @class   PlaylistsView
 * @constructor
 * @return {Object} Marionette.CompositeView
 */
function(_, Backbone, Marionette, PlaylistListItemView){
  return Marionette.CompositeView.extend({
    /**
     * Template
     * @type {Mixed}
     * @memberOf PlaylistsView
     */    
  	template: _.template($('#plstr-tmpl-playlists').html()),

    /**
     * Item View 
     * @type {Mixed}
     * @memberOf  PlaylistsView
     * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md
     */    
    itemView: PlaylistListItemView,

    /**
     * Item View Container
     * @type {Mixed}
     * @memberOf  PlaylistsView
     * @see https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.itemview.md
     */    
    itemViewContainer: 'ul'
  });

});
